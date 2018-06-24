<template>
    <section class="hero is-medium">
        <div class="signup-template">
            <div style="background-color: white; width: 500px; border-radius: 5px">
                <FormBuilder title="Crear una nueva cuenta" accept-button-title="Create" :fields="fields" button-align="Right"/>
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
export default {
    name: 'SignUp',
    components: { FormBuilder},
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
                    placeholder: 'Seleccione una imagen',
                    type: 'File',
                    fileTypes: 'image/*',
                    isRequired: false,
                    isError: false,
                    value: '',
                }
            ]
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
