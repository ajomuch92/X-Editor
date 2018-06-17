<template>
  <div id="app">
    <!-- <tabs>
      <tab title="Tab 1" :is-checked="true">
        <List name="My list" :items="items"/>
      </tab>
      <tab title="Tab 2">
        <BoxCard img="http://www.ultrahdfreewallpapers.com/uploads/large/3d-and-abstract/abstract-hd-wallpaper-651.jpg" user="Aarón Montes" user-name="ajomuch" date="11-06-2018" description="A little test"/>
      </tab>
      <tab title="Tab 3">
        <p>Content 3</p>
        <Pagination :number-of-pages="86"></Pagination>
      </tab>
    </tabs>
    <Modal :is-active="showModal" @closeModal="showModal=false">
      <template slot="header">
        <h1>Modal example</h1>
      </template>
      Bla bla bla
    </Modal> 
    <Slider :slides="slides"/> -->
    <!-- <Menu :items="menu_items"></Menu>
    <button class="button is-link" @click="showModal=true" >Submit</button> -->
    <!-- <MessageCard type="is-primary" title="Title 1">
      <h3>Lorem ipsum</h3>
    </MessageCard>
    <Breadcrumb :items="breadcrumbItems"/> -->
    <Editor lang="php"/>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Modal from './components/Modal.vue';
import Slider from './components/Slider.vue';
import Pagination from './components/Pagination.vue';
import tabs from './components/tabs.vue';
import tab from './components/tab.vue'
import List from './components/List.vue';
import BoxCard from './components/BoxCard.vue';
import MessageCard from './components/MessageCard.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Editor from './components/Editor.vue';
// import { app } from './exports';

export default {
  name: 'app',
  components: { Menu, Modal, Slider, Pagination, tabs, tab, List, BoxCard, MessageCard, Breadcrumb, Editor },
  data () {
    return {
      menu_items: [
        {
            name: 'Item1',
            subitems:[],
            isDroppable: false,
            isLink: true,
            href:'#'
        },
        {
            name: 'Docs',
            subitems:[
                {name:'Get stared', href:'#'},
                {name:'Docs', href:'#'},
            ],
            isDroppable: true,
            isLink: false,
            href:'#'
        },
        {
            name: 'About us',
            subitems:[],
            isDroppable: false,
            isLink: true,
            href:'#'
        },
        {
            name: 'Galery',
            subitems:[],
            isDroppable: false,
            isLink: true,
            href:'#'
        }
      ],
      showModal: false,
      slides: [
        'https://k33.kn3.net/taringa/3/2/E/6/4/8/KonahsFvZ/B18.jpg',
        'https://k34.kn3.net/taringa/2/1/2/2/2/7/80/gabriielnu/391.jpg',
        'http://3.bp.blogspot.com/-gFqnszTFx5Y/UNoetPA-T_I/AAAAAAAAxCc/DG6urTsAi1E/s1600/Paisaje+Wallpaper+(12).jpg',
        'https://i.ytimg.com/vi/hW9PUzl7j9w/maxresdefault.jpg'
      ],
      items: [
        {
          name: 'list-1',
          icon: 'fa fa-user-circle',
          content: 'Hola mundo'
        },
        {
          name: 'list-2',
          icon: 'fa fa-bars',
          content: 'Hola universo'
        },
        {
          name: 'list-3',
          icon: 'fa fa-hand-o-up',
          content: ''
        }
      ],
      breadcrumbItems: [
        {
          text: 'Bulma',
          link: '#',
          icon: 'fas fa-home'
        },
        {
          text: 'Documentation',
          link: '#',
          icon: 'fas fa-book'
        },
        {
          text: 'Components',
          link: '#',
          icon: ''
        },
        {
          text: 'Breadcrumb',
          link: '#',
          icon: 'fas fa-thumbs-up'
        }
      ]
    }
  }
}
</script>

<style>
  
</style>
