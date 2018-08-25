<template>
  <div class="X-editor-app">
      <Menu :items="menuItems"/>
      <Slider :autoplay="true" :delay-time="6000" :is-paginable="true">
          <SliderItem slot="content">
            <div class="div-slide" id="slide1">
                <div>
                    <h1 class="title">Conoce una nueva forma de codificar</h1>
                    <h2 class="subtitle">Fácil de usar, mantener e implementar</h2>
                    <img class="logo" src="../assets/logo.png">
                </div>
            </div>
          </SliderItem>
          <SliderItem slot="content">
            <div class="div-slide" id="slide2">
                <div>
                    <h1 class="title">Lleva tus códigos donde sea y a cualquier lugar</h1>
                </div>
            </div>
          </SliderItem>
          <SliderItem slot="content">
            <div class="div-slide" id="slide3">
                <div>
                    <h1 class="title">Comparte tus códigos</h1>
                    <h2 class="subtitle">Y edítalos con otras personas en tiempo real</h2>
                </div>
            </div>
          </SliderItem>
          <SliderItem slot="content">
            <div class="div-slide" id="slide4">
                <div>
                    <h1 class="title">¿Aún no tienes una cuenta?</h1>
                    <h2 class="subtitle">Crea una ahora mismo</h2>
                    <a class="button is-link" href="#/signup">Crear</a>
                </div>
            </div>
          </SliderItem>
      </Slider>
  </div>
</template>

<script>
import Slider from '../components/Slider.vue';
import SliderItem from '../components/SliderItem.vue';
import Menu from '../components/Menu.vue';

export default {
  name: 'Index',
  components: { Slider, SliderItem, Menu },
  data(){
      return{
          menuItems: [
              {
                  name: "Inicia sesión",
                  isLink: true,
                  href: "/login"
              }
          ]
      }
  }
}
</script>

<style>
    .div-slide{
        height: -webkit-fill-available;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100%;      
        justify-content: center;
        display: flex;
        align-items: center;
        opacity: 0.9; 
        filter: alpha(opacity=20);
    }
    .content-slide{
        opacity: 1.0 !important;
    }
    #slide1{
        background-image: url('../assets/achievement-agreement-arms-1068523.jpg');
    }
    #slide2{
        background-image: url('../assets/adult-american-board-1157859.jpg');
    }
    #slide3{
        background-image: url('../assets/coaching-coders-coding-7374.jpg');
    }
    #slide4{
        background-image: url('../assets/beverage-black-coffee-business-33972.jpg');
    }
    h1{
        color: #1258DC!important;
        font-size: 3em !important;
    }
    h2{
        color: black !important;
        font-size: 1.5em !important;
    }
    .navbar-menu{
        position: absolute;
        right: 0px;
    }
    .logo{
        height: 128px;
        /* width: 64px; */
    }
</style>
