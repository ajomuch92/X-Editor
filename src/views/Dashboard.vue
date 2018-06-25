<template>
    <div class="dashboard-content">
        <div class="header-dashboard">
            <h1 class="is-title">Dashboard</h1>
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
                        <button class="button">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="level-item">
                        <breadcrumb :items="breadCrumbOptions"/>
                    </div>
                </div>
                <div class="level-right">
                    <i class="fas fa-money-bill-wave-alt" style="font-size: 32px;"></i>
                    <i class="fas fa-chart-line" style="font-size: 32px;"></i>
                    <i class="fas fa-users-cog" style="font-size: 32px;"></i>
                </div>
            </nav>
        </div>
        <div class="content-dashboard">
            <div class="tile is-ancestor">
                <div class="tile is-4 is-vertical is-parent">
                    <div class="tile is-child box">
                        <p class="title">One</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                    </div>
                    <div class="tile is-child box">
                        <p class="title">Two</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title">Three</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                        <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
                        <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import Breadcrumb from '../components/Breadcrumb';

export default {
    name: 'Dashboard',
    components: { Breadcrumb},
    data(){
        return {
            breadCrumbOptions: [
                {
                    link: '#',
                    text: 'Home',
                    icon: 'fas fa-home'
                }
            ]
        }
    }
}
</script>

<style scoped>
    i {
        padding-right: 3px;
        cursor: pointer;
        color: rgb(89, 136, 218);
    }

    i:hover {
        color: #306ED8
    }

    .content-dashboard {
        padding: 5px;
    }
</style>
