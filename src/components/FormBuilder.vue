<template>
    <div class="form-template">
        <h2 class="title is-2">{{title}}</h2>
        <form>
            <div class="field" v-for="(field, key) in fields" :key="key">
                <Checbox v-if="field.type=='Boolean'" v-model="field.value" :is-error="field.isError" :message-error="field.messageError">{{item.label}}</Checbox>
                <InputFile v-else-if="field.type=='File'" :file-types="field.fileTypes" :is-error="field.isError" :message-error="field.messageError"></InputFile>
                <InputSelect v-else-if="field.type=='Select'" v-model="field.value" :label="field.label" :options="field.options" :is-multiple="field.isMultiple" :is-error="field.isError" :message-error="field.messageError"></InputSelect>
                <InputTextArea v-else-if="field.type=='LongText'" v-model="field.value" :placeholder="field.placeholder" :rows="field.rows"  :is-error="field.isError" :message-error="field.messageError"></InputTextArea>
                <RadioButton v-else-if="field.type=='Radio'" :name="field.name">
                    <RadioOption v-for="(option,k) in field.option" :key="k">{{option}}</RadioOption>
                </RadioButton>
                <InputField v-else v-model="field.value" :label="field.label" :placeholder="field.placeholder" :type="field.type" :icon="field.icon"></InputField>
            </div>
            <div :class="'field is-grouped ' + setButtonAlign">
                <div class="control">
                    <button class="button is-link">{{acceptButtonTitle}}</button>
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

export default {
    name: 'FormBuilder',
    components: { CheckBox, InputField, InputFile, InputSelect, InputTextArea, RadioButton, RadioOption},
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
        service: {
            type: String,
            default: ''
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