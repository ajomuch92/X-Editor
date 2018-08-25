<template>
    <section class="hero is-medium">
        <div class="signup-template">
            <div style="background-color: white; width: 500px; border-radius: 5px">
                <FormBuilder title="Crear una nueva cuenta" accept-button-title="Create" :fields="fields" button-align="Right" :clean-fields="cleanFields" @form-valid="register($event)"/>
                <Notification name="login-notification" :type="notificationType" v-if="showNotification" @close-notification="showNotification=false">{{notificationMessage}}</Notification>
                <div id="social-login">
                    O regístrate con
                    <a src="#"><i class="fab fa-facebook-square"></i></a>
                    <a src="#"><i class="fab fa-google-plus"></i></a>
                    <a src="#"><i class="fab fa-github"></i></a>
                    <p>Inicia sesión <a href="#/login">aquí</a></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import FormBuilder from '../components/FormBuilder';
import Notification from '../components/Notification';
import {client} from '../client';
import _ from 'lodash';

export default {
    name: 'SignUp',
    components: {FormBuilder, Notification},
    data(){
        return {
            fields: [
                {
                    name: 'Name',
                    label: 'Name',
                    placeholder: 'Ingrese su nombre completo',
                    type: 'Text',
                    isRequired: true,
                    isError: false,
                    messageError: 'El campo de nombre es requerido',
                    value: '',
                    regex: '',
                    icon: 'far fa-user'
                },
                {
                    name: 'Date',
                    label: 'Date',
                    placeholder: 'Ingrese su fecha de nacimiento',
                    type: 'date',
                    isRequired: true,
                    isError: false,
                    messageError: 'El campo de fecha es requerido',
                    value: '',
                    regex: '',
                    icon: 'far fa-calendar-alt'
                },
                {
                    name: 'Email',
                    label: 'Email',
                    placeholder: 'Ingrese su e-mail',
                    type: 'email',
                    isRequired: true,
                    isError: false,
                    messageError: 'El correo electrónico es no válido',
                    value: '',
                    regex: '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}',
                    icon: 'fas fa-at'
                },
                {
                    name: 'Password',
                    label: 'Password',
                    placeholder: 'Ingrese su contraseña',
                    type: 'password',
                    isRequired: true,
                    isError: false,
                    messageError: 'El campo de contraseña es requerido',
                    value: '',
                    icon: 'fas fa-key'
                },
                {
                    name: 'Profile',
                    label: 'Imagen de perfil',
                    placeholder: 'Seleccionar',
                    type: 'File',
                    fileTypes: 'image/*',
                    isRequired: false,
                    isError: false,
                    value: {},
                }
            ],
            showNotification: false,
            notificationType: 'is-primary',
            notificationMessage: '',
            cleanFields: false
        }
    },
    methods: {
        register(event){
            let user = {};
            _.forEach(event, (element, key) => {
                user[element.name.toLowerCase()] = element.value;
            });
            user['tipo_usuario'] = '5b67841a6a03930b84d527ff';
            user['descripcion'] = '';
            client.service('users').create(user)
                .then(r => {
                    this.notificationMessage = 'Usuario registrado con éxito. Ya puede iniciar sesión';
                    this.showNotification = true;
                    this.notificationType = 'is-primary';
                    this.cleanFields = true;
                })
                .catch(e => {
                    this.notificationMessage = 'Error al crear usuario: correo ya registrado.';
                    this.showNotification = true;
                    this.notificationType = 'is-danger';
                });
            this.cleanFields = false;
        }
    }
}
</script>

<style scoped>
    .signup-template{
        background-image: url('../assets/ideas.jpg');
        height: -webkit-fill-available;
        width: 100%;      
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        justify-content: center;
        display: flex;
        align-items: center;
    }
    #social-login{
        padding: 20px;
        text-align: center;
        display: block;
    }
</style>
