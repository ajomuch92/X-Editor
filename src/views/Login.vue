<template>
    <section class="hero is-medium">
        <div class="login-template">
            <div style="background-color: white; width: 400px; border-radius: 5px">
                <FormBuilder title="Por favor, inicie sesión" accept-button-title="Login" :fields="fields" button-align="Center" :clean-fields="cleanFields" @form-valid="login($event)" :is-loading="isLoading"/>
                <Notification name="login-notification" :type="notificationType" v-if="showNotification" @close-notification="showNotification=false">{{notificationMessage}}</Notification>                
                <div id="social-login">
                    O inicia sesión con 
                    <a src="#"><i class="fab fa-facebook-square"></i></a>
                    <a src="#"><i class="fab fa-google-plus"></i></a>
                    <a src="#"><i class="fab fa-github"></i></a>
                    <p>¿No tienes una cuenta? Crea una <a href="#/signup">aquí</a></p>
                    <p>¿Olvidaste tu contraseña? Recupérala <a @click="showModal=true">aquí</a></p>
                </div>
            </div>
        </div>
        <Modal :is-active="showModal" @close-modal="showModal=false">
            <h2 slot="header">Recuperación de contraseña</h2>
            <InputField v-model="recoverMail" label="Correo" placeholder="Ingrese su correo" type="Mail"  :is-error="validMail" message-error="Ingrese un correo válido"></InputField>
            <button slot="footer" class="button is-info">Reestablecer</button>
        </Modal>
    </section>
</template>

<script>
import FormBuilder from '../components/FormBuilder';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import Notification from '../components/Notification';
import {client} from '../client';
import {user} from '../classes/user';
import _ from 'lodash';

export default {
    name: 'Login',
    components: {FormBuilder, Modal, InputField, Notification},
    data(){
        return {
            fields: [
                {
                    name: 'Email',
                    label: 'Email',
                    placeholder: 'Ingrese su e-mail',
                    type: 'email',
                    isRequired: true,
                    isError: false,
                    messageError: 'El correo electrónico es requerido',
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
                }
            ],
            showModal: false,
            recoverMail: '',
            validMail: false,
            showNotification: false,
            notificationType: 'is-danger',
            notificationMessage: 'Correo o contraseña incorrecta.',
            cleanFields: false,
            isLoading: false
        }
    },
    mounted(){
        client.authenticate().then( r => {
            window.location.href = '#/dashboard';
        });
    },
    methods: {
        login(event){
            this.isLoading = true;
            let fields = {}
            _.forEach(event, (element, key) => {
                fields[element.name.toLowerCase()] = element.value;
            });
            let payload = {
                strategy : 'local',
                email: fields.email,
                password: fields.password
            };
            client.authenticate(payload)
                .then(r => {
                    client.service('users').find({query: {email: payload.email}})
                        .then(u => {
                            user.setUser(u.data[0]);
                            localStorage.setItem('x_code_id',u.data[0]._id);
                            this.isLoading = false;
                            window.location.href = '#/dashboard';
                        })
                })
                .catch(error => {
                    this.notificationMessage = 'Correo o contraseña incorrecta.';
                    this.showNotification = true;
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
    .login-template{
        background-image: url('../assets/codes-coding-computer-577585.jpg');
        height: -webkit-fill-available;
        width: 100%;      
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        justify-content: center;
        display: flex;
        align-items: center;
    }
    .login-form{
        /* height: 200px; */
        width: 25%;
        background-color: white;
        border-radius: 5px;
        box-shadow: 3px;
    }

    #social-login{
        padding: 20px;
        text-align: center;
        display: block;
    }
</style>
