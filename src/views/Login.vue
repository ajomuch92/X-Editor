<template>
    <section class="hero is-medium">
        <div class="login-template">
            <div style="background-color: white; width: 300px; border-radius: 5px">
                <FormBuilder title="Please, login" accept-button-title="Login" :fields="fields" button-align="Center"/>
            </div>
        </div>
    </section>
</template>

<script>
import FormBuilder from '../components/FormBuilder';

export default {
    name: 'Login',
    components: {FormBuilder},
    data(){
        return {
            fields: [
                {
                    name: 'Email',
                    label: 'Email',
                    placeholder: 'Ingrese su e-mail',
                    type: 'email',
                    required: true,
                    isError: false,
                    messageError: 'El correo electrónico es requerido',
                    value: '',
                    regex: '',
                    icon: 'fas fa-at'
                },
                {
                    name: 'Password',
                    label: 'Password',
                    placeholder: 'Ingrese su contraseña',
                    type: 'password',
                    required: true,
                    isError: false,
                    messageError: 'El campo de contraseña es requerido',
                    value: '',
                    regex: '',
                    icon: 'fas fa-key'
                }
            ]
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
</style>
