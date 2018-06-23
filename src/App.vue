<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'app',
  data() {
    return{
      value: '',
      options: [
        {
          label: 'Honduras',
          value: 'HN'
        },
        {
          label: 'El Salvador',
          value: 'ES'
        },
        {
          label: 'Guatemala',
          value: 'GT'
        },
        {
          label: 'Nicaragua',
          value: 'Ni'
        },
        {
          label: 'Costa Rica',
          value: 'CR'
        }
      ]
    }
  }
}
</script>

<style>
  
</style>
