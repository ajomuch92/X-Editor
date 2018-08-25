<template>
    <div class="dashboard">
        <FloatNotification v-if="showFloatNotification">{{floatMessage}}</FloatNotification>
        <div class="header-dashboard">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="field has-addons">
                            <p class="control">
                                <input @focus="readyToSearch()" v-model="searchText" class="input" type="text" placeholder="Buscar...">
                            </p>
                            <p class="control">
                                <button class="button">
                                    <i class="fas fa-search"></i>
                                </button>
                            </p>
                        </div>
                    </div>
                    <div class="level-item">
                        <breadcrumb :items="breadCrumbOptions"/>
                    </div>
                </div>
                <div class="level-right">
                    <i class="my-icon fas fa-sign-out-alt" style="font-size: 32px;" @click="logout()"></i>
                </div>
            </nav>
        </div>
        <div class="content-dashboard">
            <div class="columns">
                <div class="column is-one-quarter">
                    <DropDown name="new-file-dropdown" title="Nuevo archivo">
                        <DropDownItem name="new-file" @dropdown-item-selected="dropDownHandler($event)">
                            <i class="fas fa-file-alt"></i>
                            Nuevo archivo
                        </DropDownItem>
                        <DropDownItem name="new-folder" @dropdown-item-selected="dropDownHandler($event)">
                            <i class="fas fa-folder"></i>
                            Nuevo carpeta
                        </DropDownItem>
                    </DropDown>
                    <List name="dashboard-options" :items="listOptions" @item-changed="optionsHandler($event)"></List>
                </div>
                <div class="column right-container" v-if="activePage=='my-codes'">
                    <BoxCard v-for="(file, key) in fileList" :key="key" :icons="iconBoxCard" :name="file._id" :description="file.usuario.name" :img="file.tipo_archivo.icon"  :date="formatDate(file.actualizado)" :user="file.nombre" @box-card-action-selected="fileListHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-favorites'">
                    <BoxCard v-for="(file, key) in favoriteFiles" :key="key" :icons="iconBoxCardFavorites" :name="file._id" :description="file.usuario.name" :img="file.tipo_archivo.icon"  :date="formatDate(file.actualizado)" :user="file.nombre" @box-card-action-selected="favoriteFilesHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-profile'">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img ref="pp" :src="currentUser.imagen.uri" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{currentUser.name}}</p>
                                <p class="subtitle is-6">@{{getUserName}}</p>
                            </div>
                            </div>

                            <div class="content">
                                <p class="subtitle is-5">Registrado desde: {{getRegisterDate}}</p>
                                <p class="subtitle is-6">Espacio utilizado: {{getSize}}</p>
                                <EditableLabel v-model="descripcion" @text-change="saveDescription()"></EditableLabel>
                                <tabs>
                                    <tab name="tab1" title="Editar foto" :is-checked="activeTab=='tab1'" @selected-tab="activeTab='tab1'">
                                        <InputFile v-model="newProfilePict" file-types="image/*" label="Seleccione una imagen nueva">Seleccionar</InputFile>
                                    </tab>
                                    <tab name="tab2" :is-checked="activeTab=='tab2'" title="Editar nombre de usuario" @selected-tab="activeTab='tab2'">
                                        <p>De click sobre su nombre y edítelo</p>
                                        <EditableLabel v-model="currentUser.name" @text-change="saveUsername()"></EditableLabel>
                                        <br>
                                        <myButton type="is-danger" :is-outlined="true" @click="deleteAccount()" :is-loading="isLoadingDeleting">Eliminar cuenta</myButton>
                                    </tab>
                                    <tab name="tab3" :is-checked="activeTab=='tab3'" title="Cambio de contraseña" @selected-tab="activeTab='tab3'">
                                        <FormBuilder accept-button-title="Reestablecer" :fields="fieldsPassword" button-align="Center" :clean-fields="cleanFields" @form-valid="reset($event)" :is-loadind="isLoadingChangePassword"/>
                                        <Notification name="reset-notification" type="is-danger" v-if="showNotification" @close-notification="showNotification=false">{{notificationMessage}}</Notification>
                                    </tab>
                                </tabs>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column right-container" v-else-if="activePage=='recycler-bin'">
                    <BoxCard v-for="(file, key) in deletedFiles" :key="key" :icons="iconBoxCardRecycler" :name="file._id" :description="file.usuario.name" :img="file.tipo_archivo.icon"  :date="formatDate(file.actualizado)" :user="file.nombre" @box-card-action-selected="deletedFilesHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-shared'">
                     <BoxCard v-for="(file, key) in sharedFiles" :icons="['fas fa-edit']" :key="key" :name="file._id" :description="file.usuario.name" :img="file.tipo_archivo.icon"  :date="formatDate(file.compartido)" :user="file.nombre" @box-card-action-selected="fileListHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-aportations'">
                    <LinearGraph :title="graphTitle" :labels="labels" :data="dataGraph" :border-color="color"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='Search'">
                    <BoxCard v-for="(file, key) in filteredFiles" :icons="['fas fa-edit']" :key="key" :name="file._id" :description="file.usuario.name" :img="file.tipo_archivo.icon"  :date="formatDate(file.actualizado)" :user="file.nombre" @box-card-action-selected="fileListHandler($event)"/>
                </div>
                <div class="column right-container" v-else>
                    <h1 class="title">Bienvenido a tu plataforma</h1>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import Breadcrumb from '../components/Breadcrumb';
import List from '../components/List';
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem';
import BoxCard from '../components/BoxCard';
import LinearGraph from '../components/LinearGraph';
import EditableLabel from '../components/EditableLabel';
import FormBuilder from '../components/FormBuilder';
import tabs from '../components/tabs';
import tab from '../components/tab';
import InputFile from '../components/InputFile';
import Notification from '../components/Notification';
import FloatNotification from '../components/FloatNotification';
import myButton from '../components/MyButton';
import {client} from '../client';
import {user} from '../classes/user';
import _ from 'lodash';
import dateFormat from 'dateformat';

export default {
    name: 'Dashboard',
    components: { Breadcrumb, List, DropDown, DropDownItem, BoxCard, 
                LinearGraph, EditableLabel, tabs, tab, InputFile, FormBuilder, Notification,
                FloatNotification, myButton},
    data(){
        return {
            breadCrumbOptions: [
                {
                    link: '#',
                    text: 'Dashboard',
                    icon: 'fas fa-home'
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
                    content: 'Mis favoritos'
                },
                {
                    name: 'my-profile',
                    icon: 'fas fa-user-circle',
                    content: 'Mi perfil'
                },
                {
                    name: 'recycler-bin',
                    icon: 'fas fa-trash-alt',
                    content: 'Papelera'
                },
                {
                    name: 'my-shared',
                    icon: 'fab fa-slideshare',
                    content: 'Compartido conmigo'
                },
                {
                    name: 'my-aportations',
                    icon: 'fas fa-chart-line',
                    content: 'Mis gráficas'
                }
            ],
            iconBoxCard: ['fas fa-edit','fas fa-trash-alt', 'far fa-star'],
            iconBoxCardFavorites: ['fas fa-edit','fas fa-trash-alt', 'fas fa-star'],
            iconBoxCardRecycler: ['fas fa-undo','fas fa-trash'],
            activePage: '',
            graphTitle: 'Mis aportaciones',
            labels: [],
            dataGraph: [],
            color: 'rgb(52, 123, 152)',
            user: '',
            fileList: [],
            favoriteFiles: [],
            deletedFiles: [],
            sharedFiles: [],
            currentUser: {},
            descripcion: '',
            newProfilePict: undefined,
            fieldsPassword: [
                {
                    name: 'OldPassword',
                    label: 'Ingrese la anterior contraseña',
                    placeholder: 'Contraseña',
                    type: 'password',
                    isRequired: true,
                    isError: false,
                    messageError: 'El campo de contraseña es requerido',
                    value: '',
                    regex: ''
                },
                {
                    name: 'OldPassword2',
                    label: 'Ingrese nuevamente la anterior contraseña',
                    placeholder: 'Confirmación',
                    type: 'password',
                    isRequired: true,
                    isError: false,
                    messageError: 'El campo de contraseña es requerido',
                    value: '',
                    regex: ''
                },
                {
                    name: 'NewPassword',
                    label: 'Ingrese la nueva contraseña',
                    placeholder: 'Contraseña nueva',
                    type: 'password',
                    isRequired: true,
                    isError: false,
                    messageError: 'El campo de nueva contraseña es requerido',
                    value: '',
                    regex: ''
                }
            ],
            cleanFields: false,
            showNotification: false,
            notificationMessage: '',
            floatMessage: '',
            showFloatNotification: false,
            activeTab: 'tab1',
            globalFiles: [],
            searchText: '',
            isLoadingChangePassword: false,
            currentSize: 0,
            isLoadingDeleting: false
        }
    },
    mounted(){
        client.authenticate()
            .then(r => {
                this.user = localStorage.getItem('x_code_id');
                let files =  client.service('archivos').find({query: {id_usuario: this.user, id_estado: '5b78c6ed72160b0bbc8b560e'}});
                let favorites = client.service('archivos').find({query: {id_usuario: this.user, id_estado: '5b7a282f725748337c4aa84e'}});
                let deleted = client.service('archivos').find({query: {id_usuario: this.user, id_estado: '5b78c70b72160b0bbc8b560f'}});
                let shared = client.service('archivos_compartidos_usuario').find({query: {id_usuario: this.user}});
                Promise.all([files, favorites, deleted, shared]).then(values => {
                    this.fileList = values[0].data;
                    this.favoriteFiles = values[1].data;
                    this.deletedFiles = values[2].data;
                    this.sharedFiles = values[3];
                    this.globalFiles = this.concatFiles();
                    let allFiles = {};
                    _.forEach(this.globalFiles, (file, key) => {
                        let fecha = new Date(file.creado);
                        file['fecha'] = `${fecha.getMonth()}-${fecha.getFullYear()}`;
                        allFiles[key] = file;
                    });
                    allFiles = _.groupBy(allFiles, 'fecha');
                    this.labels = _.keys(allFiles);
                    _.forEach(allFiles, (file, key) => {
                        this.dataGraph.push(file.length);
                    });
                });
                client.service('users').get(this.user).then(user => {
                    this.currentUser = user;
                    this.descripcion = this.currentUser.descripcion || 'Escriba una pequeña descripción'
                })
            })
            .catch(e => {
                window.location.href = '#/login';
            });
    },
    watch:{
        newProfilePict: function(newVal){
            client.service('users').patch(this.currentUser._id, {profile : this.newProfilePict})
                .then(r=> {
                    this.floatMessage = 'Foto de perfil actualizada';
                    this.showFloatNotification = true;
                    setTimeout(()=>{this.showFloatNotification = false}, 1500);
                    this.$refs.pp.src = this.newProfilePict.uri;
                }).catch(console.log);
        }
    },
    computed: {
        getUserName: function(){
            let email = this.currentUser.email;
            return email.split('@')[0];
        },
        getRegisterDate: function(){
            let date = new Date(this.currentUser.createdAt);
            let registerDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            return registerDate;
        },
        filteredFiles() {
            if(!_.isEmpty(this.searchText)){
                return this.globalFiles.filter(file => {
                    return file.nombre.includes(this.searchText);
                })
            }
            return this.globalFiles;
        },
        getSize(){
            if (!('TextEncoder' in window)) {
                return 'Your browser doesnt support TextEncoder'
            }
            else {
                let bytes = 0;
                _.forEach(this.globalFiles, file => {
                    let encoder = new TextEncoder('ASCII');
                    let size = encoder.encode(file.texto);
                    bytes += size.byteLength;
                });
                return this.formatByteSize(bytes);
            }
        }
    },
    methods: {
        dropDownHandler(value){
            if(value == 'new-file'){
                window.location.href = '#/editor'
            }
        },
        optionsHandler(event){
            this.activePage = event;
        },
        logout(){
            client.logout().then(r => {
                window.location.href = '#/'
            }).catch(console.log);
        },
        fileListHandler(event){
            if(event.action == 'far fa-star'){
                client.service('archivos').patch(event.name, {id_estado: '5b7a282f725748337c4aa84e'}).then(response => {
                    let id = response._id;
                    let index = _.findIndex(this.fileList, f => { return f._id == id});
                    let file = _.find(this.fileList, f => { return f._id == id});
                    this.fileList.splice(index, 1);
                    this.favoriteFiles.push(file);
                });
            } else if(event.action == 'fas fa-trash-alt'){
                client.service('archivos').patch(event.name, {id_estado: '5b78c70b72160b0bbc8b560f'}).then(response => {
                    let id = response._id;
                    let index = _.findIndex(this.fileList, f => { return f._id == id});
                    let file = _.find(this.fileList, f => { return f._id == id});
                    this.fileList.splice(index, 1);
                    this.deletedFiles.push(file);
                });
            } else if(event.action == 'fas fa-edit'){
                window.location.href = '#/editor/' + event.name;
            }
        },
        favoriteFilesHandler(event){
            if(event.action == 'fas fa-star'){
                client.service('archivos').patch(event.name, {id_estado: '5b78c6ed72160b0bbc8b560e'}).then(response => {
                    let id = response._id;
                    let index = _.findIndex(this.favoriteFiles, f => { return f._id == id});
                    let file = _.find(this.favoriteFiles, f => { return f._id == id});
                    this.favoriteFiles.splice(index, 1);
                    this.fileList.push(file);
                });
            } else if(event.action == 'fas fa-trash-alt'){
                client.service('archivos').patch(event.name, {id_estado: '5b78c70b72160b0bbc8b560f'}).then(response => {
                    let id = response._id;
                    let index = _.findIndex(this.favoriteFiles, f => { return f._id == id});
                    let file = _.find(this.favoriteFiles, f => { return f._id == id});
                    this.favoriteFiles.splice(index, 1);
                    this.deletedFiles.push(file);
                });
            } else if(event.action == 'fas fa-edit'){
                window.location.href = '#/editor/' + event.name;
            }
        },
        deletedFilesHandler(event){
            if(event.action == 'fas fa-undo'){
                client.service('archivos').patch(event.name, {id_estado: '5b78c6ed72160b0bbc8b560e'}).then(response => {
                    let id = response._id;
                    let index = _.findIndex(this.deletedFiles, f => { return f._id == id});
                    let file = _.find(this.deletedFiles, f => { return f._id == id});
                    this.deletedFiles.splice(index, 1);
                    this.fileList.push(file);
                });
            } else if(event.action == 'fas fa-trash'){
                client.service('archivos').patch(event.name, {id_estado: '5b78c71272160b0bbc8b5610'}).then(response => {
                    let id = response._id;
                    let index = _.findIndex(this.deletedFiles, f => { return f._id == id});
                    let file = _.find(this.deletedFiles, f => { return f._id == id});
                    this.deletedFiles.splice(index, 1);
                });
            }
        },
        saveDescription(){
            this.activeTab = 'tab1';
            client.service('users').patch(this.currentUser._id, {descripcion: this.descripcion})
                .then(r => {
                    this.floatMessage = 'Descripción actualizada';
                    this.showFloatNotification = true;
                    setTimeout(()=>{this.showFloatNotification = false}, 1500);
                }).catch(console.log);
        },
        saveUsername(){
            this.activeTab = 'tab2';
            client.service('users').patch(this.currentUser._id, {name: this.currentUser.name})
                .then(r => {
                    this.floatMessage = 'Nombre actualizado';
                    this.showFloatNotification = true;
                    setTimeout(()=>{this.showFloatNotification = false}, 1500);
                }).catch(console.log);
        },
        reset(event){
            this.activeTab = 'tab3';
            this.isLoadingChangePassword = true;
            if(event[0].value === event[1].value){
                if(event[0].value !== event[2].value){
                    client.service('users').patch(this.currentUser._id, {password: event[2].value})
                        .then(r => {
                            this.floatMessage = 'Contraseña actualizada';
                            this.showFloatNotification = true;
                            this.cleanFields = true;
                            this.isLoadingChangePassword = false;
                            setTimeout(()=>{this.showFloatNotification = false}, 1500);
                        }).catch(console.log);
                } else {
                    this.notificationMessage = 'La contraseña nueva es igual a la anterior';
                    this.showNotification = true;
                    this.isLoadingChangePassword = false;
                }
            } else {
                this.notificationMessage = 'Las contraseñas no coinciden';
                this.isLoadingChangePassword = false;
                this.showNotification = true;
            }
        },
        readyToSearch(){
            this.activePage = 'Search';
        },
        concatFiles(){
            let allFiles = [];
            _.forEach(this.fileList, file => {
                allFiles.push(file);
            });
            _.forEach(this.deletedFiles, file => {
                allFiles.push(file);
            });
            _.forEach(this.favoriteFiles, file => {
                allFiles.push(file);
            });
            return allFiles;
        },
        formatByteSize(bytes) {
            if(bytes < 1024) return bytes + ' bytes';
            else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + ' KiB';
            else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + ' MiB';
            else return(bytes / 1073741824).toFixed(3) + ' GiB';
        },
        deleteAccount(){
            this.isLoadingDeleting = true;
            client.service('users').remove(this.currentUser._id).then(r => {
                this.activeTab = 'tab3';
                this.isLoadingDeleting = false;
                this.logout();
            }).catch(console.log);
        },
        formatDate(string){
            let date = new Date(string);
            return dateFormat(date, 'dd-mm-yyyy');
        }
    }
}
</script>

<style>
    .my-icon{
        padding-right: 3px;
        cursor: pointer;
        color: #D4EDF7;
    }

    .my-icon:hover {
        color: #090934;
    }

    .content-dashboard {
        padding: 20px;
        background-color: #D4EDF7;
        height: -webkit-fill-available;
    }
    .header-dashboard{
        background-color: #347B98;
        padding: 12px;
    }
    .list{
        background-color: whitesmoke;
    }

    .dropdown{
        margin-left: 10px;
    }

    .right-container {
        display: flex;
        flex-wrap: wrap;
    }
</style>
