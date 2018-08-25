<template>
    <div class="editable-label">
        <label v-if="!isEditable" @click="makeEditable">{{value}}</label>
        <InputField v-else @blur="textChanged" v-model="text" icon="far fa-edit"></InputField>
    </div>
</template>

<script>
import InputField from './InputField';
export default {
    name: 'EditableLabel',
    components: {InputField},
    model: {
        prop: 'value',
        event: 'text-change'
    },
    props: {
        value: {
            type: String,
            default: 'Your text here'
        }
    },
    data(){
        return {
            isEditable: false,
            text: ''
        }
    },
    created(){
        this.text = this.value;
    },
    methods: {
        makeEditable(){
            this.text = this.value;
            this.isEditable = !this.isEditable;
        },
        textChanged(event){
            this.isEditable = false;
            this.$emit('text-change', this.text);
        }
    }
}
</script>

<style>

</style>
