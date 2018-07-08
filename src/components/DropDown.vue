<template>
    <div class="dropdown" :class="{'is-hoverable': isHoverable, 'is-active':isActive}">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" @click="isActive=!isActive" @blur="isActive=false">
                <span><slot name="title">{{title}}</slot></span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropDown',
    props: {
        name: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'Click me'
        },
        isHoverable: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            isActive: false
        }
    }
}
</script>

<style scoped>
    .drop-down {
        padding: 5px;
    }
</style>

