<template>
    <div class="file" :class="{'is-danger': isError}">
        <label class="label" v-if="label!=''">{{label}}</label>
        <label class="file-label">
            <input class="file-input" type="file" :name="name" :accept="fileTypes" @change="changeInputFile($event)">
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
export default {
    name: 'InputFile',
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
        }
    },
    data(){
        return {
            fileName: '',
            file: undefined
        }
    },
    methods: {
        changeInputFile(event){
            var reader = new FileReader();
            // reader.onload = function(){
            //     var output = document.getElementById('output_image');
            //     output.src = reader.result;
            // }
            // reader.readAsDataURL(event.target.files[0]);
            this.fileName = event.target.files[0].name;
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
