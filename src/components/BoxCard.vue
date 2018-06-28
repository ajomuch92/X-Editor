<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
            <figure class="image is-64x64">
                <img :src="img" alt="Image">
            </figure>
            </div>
            <div class="media-content">
            <div class="content">
                <p>
                <strong>{{user}}</strong> <small>@{{userName}}</small> <small>{{date}}</small>
                <br>
                    {{description}}
                </p>
            </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'BoxCard',
    props: {
        img: {
            type: String
        },
        user: {
            type: String
        },
        userName: {
            type: String
        },
        date: {
            type: String
        },
        description: {
            type: String
        }
    }
}
</script>

<style scoped>
    .box{
        margin: 3px;
    }
</style>
