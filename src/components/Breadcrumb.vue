<template>
    <div class="breadcrumb-items">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li v-for="(item,key) in items" :key="key" :class="[key+1==items.length ? 'is-active' : 'is-no-active']">
                    <a :href="item.link">
                        <span class="icon is-small" v-if="item.icon">
                            <i :class="item.icon" aria-hidden="true"></i>
                        </span>
                        <span class="breadcrumb-label">{{item.text}}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Bradcrumb',
    props: {
        items: {
            type: Array,
            default: ()=>[]
        }
    }
}
</script>

<style scoped>
    .breadcrumb{
        font-size: 1.2rem !important;
    }
</style>

/*
formato de items: [
    {
        text,
        link,
        icon
    }
]
*/