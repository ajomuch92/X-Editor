<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
            <figure class="image is-64x64">
                <img :src="img" alt="Image">
            </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{{user}}</strong> <small>@{{userName}}</small> <small>{{date}}</small>
                    <br>
                        {{description}}
                    </p>
                </div>
                <nav class="level is-mobile" v-if="icons.length>0">
                    <div class="level-left">
                        <a class="level-item" v-for="(icon,key) in icons" :key="key" @click="actionSelected(icon)">
                            <span class="icon is-small">
                                <i :class="icon" aria-hidden="true"></i>
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'BoxCard',
    props: {
        name: {
            type: String
        },
        img: {
            type: String
        },
        user: {
            type: String
        },
        userName: {
            type: String
        },
        date: {
            type: String
        },
        description: {
            type: String
        },
        icons: {
            type: Array,
            default: ()=>[]
        }
    },
    methods: {
        actionSelected(icon){
            this.$emit('box-card-action-selected', {action: icon, name: this.name});
        }
    }
}
</script>

<style scoped>
    .box{
        margin: 3px;
        width: 340px;
        height: 150px;
    }
</style>
