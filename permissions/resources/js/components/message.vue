<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot>
            <span id="time">{{ time }}</span>
        </li>
        <small class="badge float-right badge-success my-1" :class="badgeClass">{{ user }}</small>

    </div>

</template>

<script>
    export default {

        props: [
           'color',
            'user',
            'time'
        ],

        computed: {
            className() {
                return 'list-group-item-'+this.color;
            },

            badgeClass() {
                return 'badge-'+this.color;
            }
        },
        mounted() {
            console.log('Message component mounted.')
        }
    }
</script>

<style scoped>
    #time {
        font-size: 9px;
        margin-top:10px;
        color:black;
    }

</style>
