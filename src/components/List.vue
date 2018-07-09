<template>
    <div class="list">
        <ListItem v-for="(item, key) in items" :key="key" :name="item.name" :icon="item.icon" :list-name="name" :is-active="item.name===selectedItem" @list-item-selected="onItemSelected($event)">
            {{item.content}}
        </ListItem>
    </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
    name: 'List',
    components: { ListItem },
    props: {
        name:{
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: ()=>[]
        }
    },
    data(){
        return {
            selectedItem: undefined
        }
    },
    methods: {
        onItemSelected(event){
            this.selectedItem = event;
            this.$emit('item-changed', event);
        }
    }
}
</script>

<style scoped>
    .list{
        margin: 10px;
    }
</style>
