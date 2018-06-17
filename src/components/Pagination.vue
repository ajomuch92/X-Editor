<template>
    <div class="navigation">
        <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="movePrev">Previous</a>
            <a class="pagination-next" @click="moveNext">Next page</a>
            <ul class="pagination-list">
                <div class="list-container" v-if="numberOfPages<6">
                    <li class="list-item" v-for="number in (1,numberOfPages)" :key="number" @click="moveTo(number)">
                        <a class="pagination-link" :class="{'is-current': number==currentPosition}" :aria-label="'Goto page' + number">{{number}}</a>
                    </li>
                </div>
                <div class="list-container" v-else-if="currentPosition<4">
                    <li class="list-item" v-for="number in 3" :key="number" @click="moveTo(number)">
                        <a class="pagination-link" :class="{'is-current': number==currentPosition}" :aria-label="'Goto page' + number">{{number}}</a>
                    </li>
                    <li class="list-item" >
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li class="list-item" @click="moveTo(numberOfPages)">
                        <a class="pagination-link" :aria-label="'Goto page'+numberOfPages">{{numberOfPages}}</a>
                    </li>
                </div>
                <div class="list-container" v-else-if="currentPosition>3 && currentPosition<=superiorLimit">
                    <li class="list-item" @click="moveTo(1)">
                        <a class="pagination-link" :aria-label="'Goto page'+1">{{1}}</a>
                    </li>
                    <li class="list-item" >
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li class="list-item" v-for="number in currentArray" :key="number" @click="moveTo(number)">
                        <a class="pagination-link" :class="{'is-current': number==currentPosition}" :aria-label="'Goto page' + number">{{number}}</a>
                    </li>
                    <li class="list-item" >
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>                    
                    <li class="list-item" @click="moveTo(numberOfPages)">
                        <a class="pagination-link" :aria-label="'Goto page'+numberOfPages">{{numberOfPages}}</a>
                    </li>
                </div>
                <div class="list-container" v-else-if="currentPosition>superiorLimit">
                    <li class="list-item" @click="moveTo(1)">
                        <a class="pagination-link" :aria-label="'Goto page'+1">{{1}}</a>
                    </li>
                    <li class="list-item" >
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li class="list-item" v-for="number in superiorArray" :key="number" @click="moveTo(number)">
                        <a class="pagination-link" :class="{'is-current': number==currentPosition}" :aria-label="'Goto page' + number">{{number}}</a>
                    </li>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props:{
        numberOfPages:{
            type: Number,
            required: true
        }
    },
    data(){
        return{
            currentPosition: 1,
            currentArray: [2, 3, 4],
            superiorArray: []
        }
    },
    mounted(){
        for(var i = this.superiorLimit+1; i <= this.numberOfPages; i++)
            this.superiorArray.push(i);
    },
    computed:{
        superiorLimit(){
            return this.numberOfPages - 3;
        }
    },
    methods:{
        moveNext(){
            if(this.currentPosition < this.numberOfPages)
                this.currentPosition++
            this.$emit('position-change', this.currentPosition);
            if(this.currentArray.indexOf(this.currentPosition)==-1){
                this.currentArray = this.currentArray.map(el=>{return el + 1});
            }
        },
        movePrev(){
            if(this.currentPosition > 1)
                this.currentPosition--
            this.$emit('position-change', this.currentPosition);
            if(this.currentArray.indexOf(this.currentPosition)==-1){
                this.currentArray = this.currentArray.map(el=>{return el - 1});
            }
        },
        moveTo(index){
            this.currentPosition = index;
            this.$emit('position-change', this.currentPosition);
        }
    }
}
</script>

<style scoped>
    .pagination{
        margin: 5px 3px 5px 3px;
    }
    .list-container{
        align-content: center
    }
    .list-item{
        display: inline
    }
</style>
