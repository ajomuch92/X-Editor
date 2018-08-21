<template>
    <div class="dashboard">
        <div class="header-dashboard">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="field has-addons">
                            <p class="control">
                                <input class="input" type="text" placeholder="Buscar...">
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
                    <BoxCard v-for="(file, key) in fileList" :key="key" :icons="iconBoxCard" :name="file._id" :user="file.usuario.name" :img="file.tipo_archivo.icon"  :date="file.creado" :description="file.nombre" @box-card-action-selected="fileListHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-favorites'">
                    <BoxCard v-for="(file, key) in favoriteFiles" :key="key" :icons="iconBoxCardFavorites" :name="file._id" :user="file.usuario.name" :img="file.tipo_archivo.icon"  :date="file.creado" :description="file.nombre" @box-card-action-selected="favoriteFilesHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-profile'">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img :src="currentUser.imagen.uri" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{currentUser.name}}</p>
                                <p class="subtitle is-6">@{{getUserName}}</p>
                            </div>
                            </div>

                            <div class="content">
                                <p>{{getRegisterDate}}</p>
                                <a>Editar foto</a>
                                <a href="#">Cambiar contrasena</a>
                                <a href="#">Eliminar cuentas</a>                                
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column right-container" v-else-if="activePage=='recycler-bin'">
                    <BoxCard v-for="(file, key) in deletedFiles" :key="key" :icons="iconBoxCardRecycler" :name="file._id" :user="file.usuario.name" :img="file.tipo_archivo.icon"  :date="file.creado" :description="file.nombre" @box-card-action-selected="deletedFilesHandler($event)"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-bills'">
                     <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">Gratuito</p>
                                </div>
                            </div>
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.</p>
                                <a class="button is-info" disabled>Comprar</a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">Plan 1</p>
                                </div>
                            </div>
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.</p>
                                <a class="button is-info">Comprar</a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">Plan 2</p>
                                </div>
                            </div>
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.</p>
                                <a class="button is-info">Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-aportations'">
                    <LinearGraph :title="graphTitle" :labels="labels" :data="dataGraph" :border-color="color"/>
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
import {client} from '../client';
import {user} from '../classes/user';
import _ from 'lodash';

export default {
    name: 'Dashboard',
    components: { Breadcrumb, List, DropDown, DropDownItem, BoxCard, LinearGraph},
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
                    name: 'my-bills',
                    icon: 'far fa-money-bill-alt',
                    content: 'Mi plan'
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
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            dataGraph: [0, 10, 5, 2, 20, 30, 45],
            color: 'rgb(52, 123, 152)',
            user: '',
            fileList: [],
            favoriteFiles: [],
            deletedFiles: [],
            currentUser: {}
        }
    },
    mounted(){
        client.authenticate()
            .then(r => {
                this.user = localStorage.getItem('x_code_id');
                client.service('archivos').find({query: {id_usuario: this.user, id_estado: '5b78c6ed72160b0bbc8b560e'}}).then(response => {
                    this.fileList = response.data;
                });
                client.service('archivos').find({query: {id_usuario: this.user, id_estado: '5b7a282f725748337c4aa84e'}}).then(response => {
                    this.favoriteFiles = response.data;
                });
                client.service('archivos').find({query: {id_usuario: this.user, id_estado: '5b78c70b72160b0bbc8b560f'}}).then(response => {
                    this.deletedFiles = response.data;
                });
                client.service('users').get(this.user).then(user => {
                    this.currentUser = user;
                })
            })
            .catch(e => {
                window.location.href = '#/login';
            });
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
    /* .breadcrumb-label {
        color: #1258DC;
    } */
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
