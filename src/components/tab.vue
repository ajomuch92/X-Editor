<template>
    <div class="tab">
       <input type="radio" :id="name" name="tab-group-1" :checked="isChecked">
       <label class="tab-title" :for="name">
           <i :class="icon" aria-hidden="true"></i>
           {{title}}
        </label>       
       <div class="content">
           <slot></slot>
       </div> 
   </div>
</template>

<script>
var Chance = require('chance');
var chance = new Chance();

export default {
    name: 'Tab',
    props: {
        name:{
            type: String,
            default: ()=>{return chance.guid()}
        },
        title:{
            type: String,
            default: 'New tab'
        },
        isChecked: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        }
    },
    methods:{
        onSelectedTab(){
            this.$emit('selected-tab', this.name);
        }
    }
}
</script>

<style scoped>
    .tab {
        float: left;
    }
    .tab-title{
        background: #eee; 
        padding: 10px; 
        color: darkblue;
        margin-left: -1px; 
        position: relative;
        left: 1px; 
        cursor: pointer;
    }
    .tab-title:hover{
        color: black;
    }
    .tab [type=radio] {
        display: none;   
    }
    .content {
        position: absolute;
        top: 28px;
        left: 0;
        background: white;
        right: 0;
        bottom: 0;
        padding: 20px;
        /* border: 1px solid #ccc; 
        border-radius: 0 5px 5px 5px; */
        /* min-height: 300px; */
        overflow-y: auto;
    }
    [type=radio]:checked ~ label {
        background: white;
        border-bottom: 1px solid white;
        z-index: 2;
        border-top: 3px solid red;
    }
    [type=radio]:checked ~ label ~ .content {
        z-index: 1;
    }
</style>
