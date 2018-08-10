<template>
    <div class="file" :class="{'is-danger': isError}">
        <label class="label" v-if="label!=''">{{label}}</label>
        <label class="file-label">
            <input ref="input" class="file-input" type="file" :name="name" :accept="fileTypes" @change="changeInputFile($event)">
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    <slot></slot>
                </span>
            </span>
            <span class="file-name" v-if="fileName">
                {{fileName}}
            </span>
        </label>
        <p class="help is-danger" v-if="isError">{{messageError}}</p>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'InputFile',
    model: {
        prop: 'value',
        event: 'input-file-change'
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        isError: {
            type: Boolean,
            default: false
        },
        messageError: {
            type: String,
            default: 'This field is required'
        },
        fileTypes: {
            type: String,
            default: ''
        },
        value: {
            type: Object,
            default: ()=>{}
        }
    },
    data(){
        return {
            fileName: '',
            size: 0,
            reader: new FileReader()
        }
    },
    watch: {
        value: function (newVal) {
            if(_.isEmpty(newVal)){
                this.$refs.input.value = '';
                this.fileName = '';
            }
        }
    },
    created(){
        this.reader.addEventListener('load', () => {
            this.$emit('input-file-change', {
                uri: this.reader.result,
                name: this.fileName,
                size: this.size
            });
        }, false);
    },
    methods: {
        changeInputFile(event){
            this.fileName = event.target.files[0].name;
            this.size = event.target.files[0].size;
            this.reader.readAsDataURL(event.target.files[0]);
        }
    }
}
</script>

<style scoped>
    .file{
        margin: 5px;
        display: block;
    }
</style>
