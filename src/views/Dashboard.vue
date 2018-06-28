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
                    <i class="my-icon fas fa-users-cog" style="font-size: 32px;"></i>
                </div>
            </nav>
        </div>
        <div class="content-dashboard">
            <div class="columns">
                <div class="column is-one-quarter">
                    <DropDown name="new-file" title="Nuevo archivo">
                        <DropDownItem>
                            <i class="fas fa-file-alt"></i>
                            Nuevo archivo
                        </DropDownItem>
                        <DropDownItem>
                            <i class="fas fa-folder"></i>
                            Nuevo carpeta
                        </DropDownItem>
                    </DropDown>
                    <List name="dashboard-options" :items="listOptions"></List>
                </div>
                <div class="column right-container">
                    <BoxCard user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
                    <BoxCard user="Aarón" img="src/assets/javascript.png" user-name="ajomuch" date="27-6-2018" description="A common file"/>
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

export default {
    name: 'Dashboard',
    components: { Breadcrumb, List, DropDown, DropDownItem, BoxCard},
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
            ]
        }
    }
}
</script>

<style scoped>
    .my-icon{
        padding-right: 3px;
        cursor: pointer;
        color: #D4EDF7;
    }

    .my-icon:hover {
        color: #0247FE
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
    .breadcrumb-label {
        color: #1258DC;
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
