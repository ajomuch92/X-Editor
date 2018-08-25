<template>
    <div class="linear-graph">
        <canvas class="custom-canvas" ref="myChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'LineaGraph',
    props: {
        labels: {
            type: Array,
            default: ()=>[]
        },
        title: {
            type: String,
            default: 'Title'
        },
        backgroundColor:{
            type: String,
            default: 'rgb(255, 99, 132)'
        },
        borderColor: {
            type: String,
            default: 'rgb(255, 99, 132)'
        },
        data: {
            type: Array,
            default: ()=>[]
        }
    },
    data(){
        return {
            chart: undefined
        }
    },
    mounted(){
        let ctx = this.$refs.myChart.getContext('2d');
        let config = {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: this.title,
                    borderColor: this.borderColor,
                    data: this.data,
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
				responsive: true,
			}
        };
        this.chart = new Chart(ctx, config);
    }
}
</script>


<style>
    .linear-graph{
        height: 500px !important;
    }
    .custom-canvas{
        height: 250px;
        width: 600px;
    }
</style>
