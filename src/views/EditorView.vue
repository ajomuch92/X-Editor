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
        <div class="content-dashboard">
            <div class="columns">                    
                    <div class="column">
                        <div class="icons-container">
                            <i class="far fa-copy"></i>    
                            <i class="fas fa-cut"></i>    
                            <i class="fas fa-paste"></i>    
                            <i class="far fa-save"></i>    
                            <i class="fas fa-download"></i>    
                            <i class="far fa-eye"></i>
                        </div>
                    <Editor/>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import Breadcrumb from '../components/Breadcrumb';
import Editor from '../components/Editor';

export default {
    name: 'Dashboard',
    components: { Breadcrumb, Editor},
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
            iconBoxCard: ['fas fa-edit','fas fa-trash-alt']
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
