<template>
    <div class="text-area">
        <div class="tool-bar">
            <div class="select">
                <select v-model="currentLanguage" @change="setLanguage()" :disabled="!isEmpty(value)">
                    <option value="0">Select language</option>
                    <option v-for="(language, key) in languages" :key="key" :value="language.name">{{language.name.replace('_', ' ')}}</option>
                </select>
            </div>
            <div class="select">
                <select v-model="themeString" @change="setTheme()">
                    <option value="0">Select theme</option>
                    <option v-for="(theme,key) in themes" :key="key" :value="theme">{{theme.replace('_', ' ')}}</option>
                </select>
            </div>
        </div>
        <div id="code-editor"></div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'Editor',
    props: {
        lang: {
            type: String,
            default: 'text'
        },
        value: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            theme: '',
            editor: undefined,
            themeString:'',
            currentLanguage: this.lang,
            languages: [
                {name: 'Abap', extension: '.abap'},
                {name: 'Actionscript', extension: '.as'},
                {name: 'ada', extension: '.ada'},
                {name: 'applescript', extension: '.applescript'},
                {name: 'assembly_x86', extension: '.s'},
                {name: 'asl', extension: '.inc'},
                {name: 'batchfile', extension: '.bat'},
                {name: 'c_cpp', extension: '.cpp'},
                {name: 'cobol', extension: '.cbl'},
                {name: 'coffee', extension: '.litcoffee'},
                {name: 'coldfusion', extension: '.cfm'},
                {name: 'csharp', extension: '.cs'},
                {name: 'css', extension: '.css'},
                {name: 'd', extension: '.d'},
                {name: 'dart', extension: '.dart'},
                {name: 'diff', extension: '.patch'},
                {name: 'dockerfile', extension: '.docker'},
                {name: 'dot', extension: '.dot'},
                {name: 'fortran', extension: '.f90'},
                {name: 'gitignore', extension: '.gitignore'},
                {name: 'groovy', extension: '.groovy'},
                {name: 'haskell', extension: '.hs'},
                {name: 'html', extension: '.html'},
                {name: 'html_ruby', extension: '.html'},
                {name: 'ini', extension: '.ini'},
                {name: 'javascript', extension: '.js'},
                {name: 'java', extension: '.java'},
                {name: 'json', extension: '.json'},
                {name: 'kotlin', extension: '.kt'},
                {name: 'latex', extension: '.tex'},
                {name: 'less', extension: '.less'},
                {name: 'lisp', extension: '.lsp'},
                {name: 'lua', extension: '.lua'},
                {name: 'matlab', extension: '.m'},
                {name: 'mysql', extension: '.sql'},
                {name: 'objectivec', extension: '.mm'},
                {name: 'pascal', extension: '.pas'},
                {name: 'perl', extension: '.pl'},
                {name: 'pgsql', extension: '.sql'},
                {name: 'php', extension: '.php'},
                {name: 'plain_text', extension: '.txt'},
                {name: 'python', extension: '.py'},
                {name: 'r', extension: '.r'},
                {name: 'razor', extension: '.cshtml'},
                {name: 'ruby', extension: '.rb'},
                {name: 'sass', extension: '.sass'},
                {name: 'scala', extension: '.sc'},
                {name: 'scss', extension: '.scss'},
                {name: 'sh', extension: '.sh'},
                {name: 'sql', extension: '.sql'},
                {name: 'sqlserver', extension: '.sql'},
                {name: 'svg', extension: '.svg'},
                {name: 'swift', extension: '.swift'},
                {name: 'text', extension: '.txt'},
                {name: 'typescript', extension: '.ts'},
                {name: 'vbscript', extension: '.vbscript'},
                {name: 'xml', extension: '.xml'}
            ],
            themes: [
                    'chaos',
                    'clouds',
                    'cobalt',
                    'dawn',
                    'dracula',
                    'dreamweaver',
                    'eclipse',
                    'github',
                    'kuroir',
                    'monokai',
                    'solarized_dark',
                    'solarized_light',
                    'sqlserver',
                    'terminal',
                    'textmate',
                    'tomorrow',
                    'twilight',
                    'xcode',
                    ]
        }
    },
    watch:{
        value: function(newVal){
            this.setValue();
        }
    },
    mounted(){
        this.editor = ace.edit('code-editor');
        this.editor.setTheme(this.themeString);
        this.editor.session.setMode('ace/mode/'+this.lang);
        this.$emit('editor-change', {
            value: '',
            extension: 'text'
        });
        this.editor.on('change', (e) => {
            let value = this.editor.getValue();
            let session = this.editor.getSession();
            let language = _.find(this.languages, l => {return l.name == this.currentLanguage});
            let extension = language.extension;
            this.$emit('editor-change', {
                value: value,
                extension
            });
        });        
    },
    methods: {
        setTheme(){
            if(this.themeString !== '0')
                this.editor.setTheme('ace/theme/' + this.themeString);
        },
        setLanguage(){
            if(this.currentLanguage !== '0')
                this.editor.session.setMode('ace/mode/'+this.currentLanguage);
        },
        setValue(){
            if(!_.isEmpty(this.value)){
                let newString = this.value.value;
                this.editor.setValue(newString, 0);
                let language = _.find(this.languages, l => {return l.extension == this.value.extension});
                this.editor.session.setMode('ace/mode/'+language.name.toLowerCase());
                this.currentLanguage = language.name.toLowerCase();
                this.$emit('editor-change', {
                    value: newString,
                    extension: this.value.extension
                });
            } 
        },
        isEmpty(obj){
            return _.isEmpty(obj);
        }
    }
}
</script>

<style scoped>
    .text-area{
        margin: 5px;
    }
    .tool-bar{
        margin: 8px;
    }
    .select{
        float: right;
        margin-bottom: 5px;
        margin-right: 5px;
        border: none;
    }
    #code-editor{
        width: 99%;
        height: 500px;
    }

</style>
