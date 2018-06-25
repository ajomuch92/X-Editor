<template>
    <div class="modal" :class="{'is-active': isActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <slot name="header"></slot>
          </p>
        <button class="delete" aria-label="close" @click="$emit('close-modal')"></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
    props:{
      isActive:{
        type: Boolean,
        default: false,
        required: true
      }
    }
}
</script>

<style scoped>

</style>
