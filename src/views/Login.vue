<template>
    <section class="hero is-medium">
        <div class="login-template">
            <div style="background-color: white; width: 400px; border-radius: 5px">
                <FormBuilder title="Por favor, inicie sesión" accept-button-title="Login" :fields="fields" button-align="Center"/>
                <div id="social-login">
                    O inicia sesión con 
                    <a src="#"><i class="fab fa-facebook-square"></i></a>
                    <a src="#"><i class="fab fa-google-plus"></i></a>
                    <a src="#"><i class="fab fa-github"></i></a>
                    <p>¿No tienes una cuenta? Crea una <a href="#/signup">aquí</a></p>
                    <p>¿Olvidaste tu contraseña? Recupérala <a href="#/signup">aquí</a></p>
                </div>
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

    #social-login{
        padding: 20px;
        text-align: center;
        display: block;
    }
</style>
