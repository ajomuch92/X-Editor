<template>
    <div class="form-template">
        <h2 class="title is-2">{{title}}</h2>
        <form>
            <div class="field" v-for="(field, key) in fields" :key="key">
                <Checbox v-if="field.type=='Boolean'" v-model="field.value" :is-error="field.isError" :message-error="field.messageError">{{field.label}}</Checbox>
                <InputFile v-else-if="field.type=='File'" v-model="field.value" :file-types="field.fileTypes" :label="field.label" :is-error="field.isError" :message-error="field.messageError">{{field.placeholder}}</InputFile>
                <InputSelect v-else-if="field.type=='Select'" v-model="field.value" :label="field.label" :options="field.options" :is-multiple="field.isMultiple" :is-error="field.isError" :message-error="field.messageError"></InputSelect>
                <InputTextArea v-else-if="field.type=='LongText'" v-model="field.value" :placeholder="field.placeholder" :rows="field.rows"  :is-error="field.isError" :message-error="field.messageError"></InputTextArea>
                <RadioButton v-else-if="field.type=='Radio'" :label="field.label" :name="field.name">
                    <RadioOption v-for="(option,k) in field.options" :key="k" :value="option.value" :group-name="field.name">{{option.label}}</RadioOption>
                </RadioButton>
                <InputField v-else v-model="field.value" :label="field.label" :placeholder="field.placeholder" :type="field.type" :icon="field.icon" :is-error="field.isError" :message-error="field.messageError"></InputField>
            </div>
            <div :class="'field is-grouped ' + setButtonAlign">
                <div class="control">
                    <!-- <button class="button is-link" @click="acceptForm($event)">{{acceptButtonTitle}}</button> -->
                    <myButton type="is-link" :is-loading="isLoading" @click="acceptForm($event)">{{acceptButtonTitle}}</myButton>
                </div>
                <div class="control" v-if="isCancelable">
                    <button class="button is-text">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import CheckBox from './Checkbox';
import InputField from './InputField';
import InputFile from './InputFile';
import InputSelect from './InputSelect';
import InputTextArea from './InputTextArea';
import RadioButton from './RadioButton';
import RadioOption from './RadioOption';
import myButton from './MyButton'
import Vue from 'vue';
import _ from 'lodash';

export default {
    name: 'FormBuilder',
    components: { CheckBox, InputField, InputFile, InputSelect, InputTextArea, RadioButton, RadioOption, myButton},
    props: {
        title: {
            type: String,
            default: ''
        },
        isCancelable: {
            type: Boolean,
            default: false,
        },
        fields: {
            type: Array,
            default: ()=>[]
        },
        acceptButtonTitle: {
            type: String,
            default: 'Submit'
        },
        buttonAlign: {
            type: String,
            default: 'Center'
        },
        cleanFields: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        setButtonAlign(){
            switch(this.buttonAlign){
                case 'Center':
                    return 'is-grouped-centered'
                    break;
                case 'Right':
                    return 'is-grouped-right'
                    break;
                case 'Left':
                    return ''
                    break;
            }
        }
    },
    watch: {
        cleanFields: function(newVal){
            if(newVal){
                this.clearFields();
            }
        }
    },
    methods: {
        acceptForm(event){
            // event.preventDefault();
            this.setDefaultErrorValues();
            if(this.validateFields()){
                let fields = _.map(this.fields, field => {
                    return {
                        name: field.name,
                        value: field.value
                    }
                });
                // this.clearFields();
                this.$emit('form-valid', fields);
            }
        },
        validateFields(){
            var isValidate = true;
            for(var i = 0; i < this.fields.length; i++){
                if(this.fields[i].isRequired && !this.fields[i].value) {
                    isValidate = false;
                    Vue.set(this.fields[i],'isError', true);
                } else if(this.fields[i].isRequired && this.fields[i].regex){
                    var re = new RegExp(this.fields[i].regex,"igm");
                    isValidate = re.test(this.fields[i].value);
                    Vue.set(this.fields[i],'isError', !isValidate);
                }
            }
            return isValidate;
        },
        setDefaultErrorValues(){
            for(var i = 0; i < this.fields.length; i++){
                Vue.set(this.fields[i],'isError', false);
            }
        },
        clearFields(){
            for(var i = 0; i < this.fields.length; i++){
                if(_.isObject(this.fields[i].value)){
                    Vue.set(this.fields[i],'value', {});
                } else {
                    Vue.set(this.fields[i],'value', '');
                }
            }
        }
    }
}
</script>

<style scoped>
    .form-template{
        margin: 10px;
    }
    h2{
        color: black !important;
        text-align: center;
    }
    .accept-button{
        border: 1px solid #27ACFF;
        cursor: pointer;
        padding: 8px;
        border-radius: 3px;
        color: white;
        background-color: #279CFC;
    }
    .accept-button:hover{
        background-color: rgb(19, 144, 247);
    }
</style>

/*
    [
        {
            name,
            label,
            placeholder,
            type: 'Text', 'LongText', 'Number', 'Password', 'email', 'file', 'Boolean', 'Select', 'Radio'
            required,
            regex,
            messageError
            --Add this to new object--
            error,
            value
        }
    ]
 */