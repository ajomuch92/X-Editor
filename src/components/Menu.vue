<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item" v-if="hasBrand">
        <slot name="brand"></slot>
      </a>
      <div class="navbar-burger burger" data-target="navbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <div v-for="(item,key) in items" :key="key" class="single-nav">
          <a v-if="item.isLink" class="navbar-item" :href="item.href">{{item.name}}</a>
          <div v-else-if="item.isDroppable" class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link" href="/documentation/overview/start/">
              {{item.name}}
            </div>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" v-for="(subitem,index) in item.subitems" :key="index" :href="subitem.href">
                {{subitem.name}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    props:{
      items:{
        type: Array,
        required: true
      },
      hasBrand:{
        type: Boolean,
        default: false
      }
    },
    mounted(){
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            var target = $el.dataset.target;
            var $target = document.getElementById(target);
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }
    }
  }
</script>

<style>
  .navbar{
    /*background-color: lightgray;*/
    background-color: rgba(255, 255, 255, 0);
    border-radius: 5px;
    margin: 5px;
    float: left;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 99%;
  }

  .navbar-menu{
    margin-top: 5px;
  }

  .navbar-item{
    border-radius: 3px;    
    background-color: white !important;
    margin-left: 10px;
  }

  .navbar-item:hover{
    border-bottom: solid blue 4px;
  }

  .navbar-item.has-dropdown.is-hoverable{
    border-radius: 3px !important;
  }

  .navbar-burger.burger.is-active{
    border-radius: 3px;
  }
</style>
