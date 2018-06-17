<template>
    <div class="list-item" @click="$emit('list-item-selected',name)">
        <a class="panel-block" :class="{'is-active': isActive}" >
            <span class="panel-icon">
                <i :class="icon" aria-hidden="true"></i>
            </span>
            <slot></slot>
        </a>
    </div>
</template>

<script>
var Chance = require('chance');
var chance = new Chance();

export default {
    name: 'ListItem',
    props: {
        name:{
            type: String,
            default: ()=>{return chance.guid()}
        },
        icon: {
            type: String,
            default: ''
        },
        listName:{
            type: String,
            default: 'list'
        },
        isActive:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    [type=radio] {
        display: none;   
    }
    .content{
        display: inline-flex;
        cursor: pointer;
    }
    .panel-icon{
        margin-top: 5px;
    }
</style>
