<template>
    <div class="dashboard">
        <div class="header-dashboard">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <breadcrumb :items="breadCrumbOptions"/>
                    </div>
                </div>
            </nav>
        </div>
        <Notification v-if="showNotification">{{messageNotification}}</Notification>
        <div class="content-dashboard">
            <div class="columns">                    
                <div class="column">
                    <div class="icons-container">   
                        <i class="far fa-save" @click="showSaveModal()"></i>    
                        <i class="fas fa-download" @click="downloadFile()"></i>    
                        <i class="far fa-share-square" @click="showShareModal()"></i>
                    </div>
                    <Editor :value="valueEditor" @editor-change="editorHandler($event)"/>
                </div>
                <Modal :is-active="showModal" @close-modal="showModal=false">
                    <h2 slot="header">Guardar archivo</h2>
                    <label for="">Se guardará como un archivo {{editorValue.extension}}</label>
                    <InputField label="Nombre" type="text" :is-error="isValidName" message-error="Ingrese un nombre" v-model="fileName"></InputField>
                    <button slot="footer" class="button is-info" @click="saveFile()">Guardar</button>
                </Modal>
                <Modal :is-active="showSharedModal" @close-modal="showSharedModal=false">
                    <h2 slot="header">Compartir archivo</h2>
                    <InputField label="Correo electrónico" type="text" :is-error="isValidEmail" :message-error="validationMessage" v-model="email"></InputField>
                    <!-- <button slot="footer" class="button is-info" >Compartir</button> -->
                    <myButton slot="footer" type="is-info" :is-loading="isLoading" @click="shareFile()">Compartir</myButton>
                </Modal>
            </div>
        </div>
    </div> 
</template>

<script>
import Breadcrumb from '../components/Breadcrumb';
import Editor from '../components/Editor';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import InputField from '../components/InputField';
import Notification from '../components/FloatNotification';
import myButton from '../components/MyButton';
import {client} from '../client';
import {user} from '../classes/user';
import _ from 'lodash';
import FileSaver from 'file-saver';

export default {
    name: 'Dashboard',
    components: { Breadcrumb, Editor, Modal, InputField, Dropdown, Notification, myButton},
    data(){
        return {
            breadCrumbOptions: [
                {
                    link: '#/dashboard',
                    text: 'Dashboard',
                    icon: 'fas fa-home'
                },
                {
                    link: '#',
                    text: 'New File',
                    icon: 'fas fa-file'
                }
            ],
            listOptions: [
                {
                    name: 'my-codes',
                    icon: 'far fa-hdd',
                    content: 'Mis códigos'
                },
                {
                    name: 'my-favorites',
                    icon: 'fas fa-star',
                    content: 'Mis favoritas'
                },
                {
                    name: 'recycler-bin',
                    icon: 'fas fa-trash-alt',
                    content: 'Papelera'
                },
                {
                    name: 'my-bills',
                    icon: 'far fa-money-bill-alt',
                    content: 'Mi plan'
                },
                {
                    name: 'my-aportation',
                    icon: 'fas fa-chart-line',
                    content: 'Mis gráficas'
                }
            ],
            iconBoxCard: ['fas fa-edit','fas fa-trash-alt'],
            showModal: false,
            valueEditor: {},
            activeModal: false,
            fileTypeSelected:{},
            editorValue: {},
            fileName: '',
            user: '',
            userObject: {},
            isValidName: false,
            currentFile: {},
            showNotification: false,
            messageNotification: '',
            showSharedModal: false,
            email: '',
            isValidEmail: false,
            validationMessage: '',
            isLoading: false
        }
    },
    mounted(){
        client.authenticate().then(r => {
            this.user = window.localStorage.getItem('x_code_id');
            client.service('users').get(this.user).then(r =>{
                this.userObject = r;
            })
            if(!_.isUndefined(this.$route.params.file_id) && !_.isEmpty(this.$route.params.file_id)){
                client.service('archivos').get(this.$route.params.file_id).then(response => {
                    this.currentFile = response;
                    this.valueEditor = {
                        value: this.currentFile.texto,
                        extension: this.currentFile.tipo_archivo.extension || '.' + this.currentFile.tipo_archivo.name
                    };
                    this.breadCrumbOptions[1].text = this.currentFile.nombre;
                });
            }
        }).catch(e => {
            window.location.href = '#/login';
        });
    },
    methods:{
        showSaveModal(){
            if(_.isEmpty(this.currentFile))
                this.showModal = true;
            else 
                this.saveFile();
        },
        showShareModal(){
            if(!_.isEmpty(this.currentFile))
                this.showSharedModal = true;
            else {
                this.messageNotification = 'Primero debe guardar el archivo';
                this.showNotification = true;
                setTimeout(()=>{this.showNotification = false}, 1500);
            }
        },
        editorHandler(event){
            this.editorValue = event;
        },
        saveFile(){
            this.messageNotification = 'Guardando archivo';
            this.showNotification = true;
            if(_.isEmpty(this.currentFile)){
                if(!_.isEmpty(this.fileName)){
                    let newFile = {
                        nombre: this.fileName,
                        id_usuario: this.user,
                        estado: 'Activo',
                        tipo_archivo: this.editorValue.extension,
                        texto: this.editorValue.value,
                    };
                    this.showModal = false;
                    client.service('archivos').create(newFile).then(r => {
                        this.messageNotification = 'Archivo guardado';
                        setTimeout(()=>{this.showNotification = false}, 1500);
                        window.location.href = '#/editor/' + r._id;
                    }).catch(console.log);
                } else {
                    this.isValidName = true;
                }
            } else {
                client.service('archivos').patch(this.currentFile._id, {texto: this.editorValue.value})
                    .then(r => {
                        this.messageNotification = 'Archivo guardado';
                        setTimeout(()=>{this.showNotification = false}, 1500);
                    })
                    .catch(console.log)
            }
        },
        downloadFile(){
            let extension = this.editorValue.extension;
            let fileName = this.currentFile.nombre + extension;
            let blob = new Blob([this.currentFile.texto], {type: 'text/plain;charset=utf-8'});
            FileSaver.saveAs(blob, fileName);
        },
        shareFile(){
            this.isLoading = true;
            if(this.validateEmail(this.email)){
                if(this.email == this.userObject.email){
                    this.validationMessage = 'No se puede compartir un archivo consigo mismo';
                    this.isLoading = false;
                    this.isValidEmail = true;
                } else {
                    client.service('users').find({query: {email: this.email}}).then(r => {
                        if(r.total == 0){
                            this.validationMessage = 'No se ha encontrado el usuario con este correo';
                            this.isLoading = false;
                            this.isValidEmail = true;
                        } else {
                            let idUserInvited = r.data[0]._id;
                            client.service('archivos_compartidos_usuario').find({query: {
                                id_archivo: this.$route.params.file_id,
                                id_usuario: idUserInvited,
                            }}).then(res => {
                                if(!_.isEmpty(res)){
                                    this.validationMessage = 'El archivo ya fue compartido con este usuario';
                                    this.isLoading = false;
                                    this.isValidEmail = true;
                                } else {
                                    client.service('archivos_compartidos_usuario').create({
                                        id_archivo: this.$route.params.file_id,
                                        id_usuario: idUserInvited,
                                        compartido: new Date()
                                    }).then(r => {
                                        this.email = '';
                                        this.showSharedModal = false;
                                        console.log(r);
                                    })
                                }
                            });
                        }
                    }).catch(console.log);
                }
            } else {
                this.validationMessage = 'No ha ingresado un correo válido';
                this.isValidEmail = true;
                this.isLoading = false;
            }
        },
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
}
</script>

<style>
    .content-dashboard {
        padding: 20px;
        background-color: #D4EDF7;
        height: -webkit-fill-available;
    }
    .header-dashboard{
        background-color: #347B98;
        padding: 12px;
    }

    .is-no-active a{
        color: #D4EDF7;
    }

    .is-no-active a:hover{
        color: #090934;
    }
    .icons-container i {
        font-size: 1.8em;
        cursor: pointer;
        font-weight: bold;
    }
    .icons-container i:hover {
        color: #2E2FE3;
    }
</style>
