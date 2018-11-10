
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Vue from 'vue'

//for autoscroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

// for notifications
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000});

Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',

    data: {
        message: '',

        chat: {

            messages:[],

            user: [],

            color: [],

            time: []
        },
        typing: '',

        numberOfUsers: 0
    },

    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name:this.message
                });
        }
    },

    methods: {
        send() {

            if ( this.message.length !== 0) {
                this.chat.messages.push(this.message);
                this.chat.user.push('you');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());

                axios.post('/send', {

                    message: this.message,
                    chat: this.chat

                }).then( response => {
                    console.log('chat response: ',response);
                    this.message = '';

                }).catch( error => {
                    console.log('chat error: ',error);

                });
            }

        },
        getTime() {
            let time = new Date();
            return time.getHours() + ':'+time.getMinutes();
        }
    },

    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.messages.push(e.message);
                this.chat.user.push(e.user.name);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());
                console.log('message from Echo: '+e.message, e.user);
            })
            .listenForWhisper('typing', (e) => {

                console.log('typing callback: ',e);
                if (e.name !== '') {
                    this.typing = 'typing... '
                } else {
                    this.typing = '';
                }

            });

        Echo.join('chat')
            .here((users) => {
                this.numberOfUsers = users.length;
                // console.log('users here: ',  this.numberOfUsers);
            })
            .joining((user) => {
                this.numberOfUsers += 1;
                this.$toaster.success(user.name + ' has just joined the channel.');
                //console.log('user joining: ',user.name, 'user count: ', this.numberOfUsers);
            })
            .leaving((user) => {
                this.numberOfUsers -= 1;
                this.$toaster.warning(user.name + ' has just left the channel.')
                //console.log('user leaving: ', user.name, 'user count: ', this.numberOfUsers);
            });
    }
});
