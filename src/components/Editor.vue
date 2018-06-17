<template>
    <div class="text-area">
        <div class="tool-bar">
            <div class="select">
                <select v-model="currentLanguage" @change="setLanguage()">
                    <option value="0">Select language</option>
                    <option v-for="(language,key) in languages" :key="key" :value="language">{{language.replace('_', ' ')}}</option>
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

export default {
    name: 'Editor',
    props: {
        lang: {
            type: String,
            default: ''
        },
        emitValue: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            theme: '',
            editor: undefined,
            themeString:'',
            currentLanguage: this.lang,
            languages: ['abap',
                        'actionscript',
                        'ada',
                        'applescript',
                        'assembly_x86',
                        'asl',
                        'batchfile',
                        'c_cpp',
                        'cobol',
                        'coffee',
                        'coldfusion',
                        'csharp',
                        'css',
                        'd',
                        'dart',
                        'diff',
                        'django',
                        'dockerfile',
                        'dot',
                        'eiffel',
                        'elm',
                        'forth',
                        'fortran',
                        'gcode',
                        'gitignore',
                        'gls',
                        'graphqlschema',
                        'groovy',
                        'haml',
                        'haskell',
                        'hjson',
                        'html',
                        'html_ruby',
                        'ini',
                        'javascript',
                        'java',
                        'json',
                        'jsp',
                        'julia',
                        'kotlin',
                        'latex',
                        'less',
                        'lisp',
                        'logiql',
                        'lua',
                        'luapage',
                        'markdown',
                        'matlab',
                        'mysql',
                        'objectivec',
                        'pascal',
                        'perl',
                        'pgsql',
                        'php',
                        'plain_text',
                        'powershell',
                        'prolog',
                        'python',
                        'r',
                        'razor',
                        'ruby',
                        'sass',
                        'scala',
                        'scheme',
                        'scss',
                        'sh',
                        'sjs',
                        'smarty',
                        'snippets',
                        'sparql',
                        'sql',
                        'sqlserver',
                        'svg',
                        'swift',
                        'text',
                        'typescript',
                        'vbscript',
                        'verilog',
                        'vhdl',
                        'xml',
                        'yaml'
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
    mounted(){
        this.editor = ace.edit('code-editor');
        this.editor.setTheme(this.themeString);
        this.editor.session.setMode('ace/mode/'+this.lang);
    },
    watch: {
        emitValue(newVal){
            if(newVal){
                this.$emit('get-editor-value',this.editor.getValue());
            }
        }
    },
    methods: {
        setTheme(){
            if(this.themeString !== '0')
                this.editor.setTheme('ace/theme/' + this.themeString);
        },
        setLanguage(){
            if(this.currentLanguage !== '0')
                this.editor.session.setMode('ace/mode/'+this.currentLanguage);
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
