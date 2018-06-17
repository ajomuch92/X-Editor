<template>
    <div class="breadcrumb">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li v-for="(item,key) in items" :key="key" :class="{'is-active': key+1==items.length}">
                    <a :href="item.link">
                        <span class="icon is-small" v-if="item.icon">
                            <i :class="item.icon" aria-hidden="true"></i>
                        </span>
                        <span>{{item.text}}</span>
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