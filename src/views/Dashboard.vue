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
                    <BoxCard :icons="iconBoxCard" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCard" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCard" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCard" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-favorites'">
                    <BoxCard :icons="iconBoxCardFavorites" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCardFavorites" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCardFavorites" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCardFavorites" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                </div>
                <div class="column right-container" v-else-if="activePage=='my-profile'">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">John Smith</p>
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                            </div>

                            <div class="content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p>
                                <a>Editar foto</a>
                                <a href="#">Cambiar contrasena</a>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column right-container" v-else-if="activePage=='recycler-bin'">
                    <BoxCard :icons="iconBoxCardRecycler" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCardRecycler" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCardRecycler" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard :icons="iconBoxCardRecycler" user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
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
import LinearGraph from '../components/LinearGraph'

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
            window.location.href = '#/'
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
