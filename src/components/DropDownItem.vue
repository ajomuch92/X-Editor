<template>
    <a class="dropdown-item" @click="onSelectDropDownItem()">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'DropDownItem',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        onSelectDropDownItem(){
            this.$emit('dropdown-item-selected',this.name);
        }
    }
}
</script>
