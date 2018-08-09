<template>
    <div :class="oneClickState ? 'popup-buy-1-click active' : 'popup-buy-1-click'">
        <div class="buy-1-click-overlay" v-on:click="toggleState"></div>
        <div class="inner-container">
            <div class="section">
                <div class="remove-elem" v-on:click="toggleState">
                    <img src="/images/icons/close-icon.svg"/>
                </div>
                <h4>{{ title }}</h4>
                <div action="one_click_order" name="phone" id="bottom-contact-form" class="phone-form" remote="true"
                     authenticity_token="true">
                    <span>{{ firstNamePhrase }}, {{ lastNamePhrase }}</span>
                    <input type="text" outline="none" name="name" v-model="name" placeholder="" maxlength="" required/>
                    <span>{{ phonePhrase }}</span>
                    <input type="tel" outline="none" name="phone" v-model="phone" placeholder="" maxlength="" required/>
                    <span>Email</span>
                    <input type="email" outline="none" name="email" v-model="email" placeholder="" maxlength=""
                           required/>
                    <button type="submit" id="one_click_order_submit"
                            v-on:click="sendOrder">{{ buttonPhrase }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: [
            'title',
            'firstNamePhrase',
            'lastNamePhrase',
            'phonePhrase',
            'buttonPhrase',
            'spreeCurrentOrderId',
            'spreeCurrentOrderToken'
        ],
        data() {
            return {
                name: '',
                phone: '',
                email: ''
            }
        },
        methods: {
            toggleState() {
                this.$store.commit('toggleOneClickState');
            },
            sendOrder() {
                let _that = this,
                    csrf = $('meta[name="csrf-token"]').attr('content'),
                    request = {
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        authenticity_token: csrf,
                        orderId: this.spreeCurrentOrderId
                    };
                let sendForm = $.ajax({
                    url: '/one-click-order',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(request),
                });
                sendForm.done((response) => {
                    alert('Заказ отправлен! / The order is sent!');
                    _that.name = '';
                    _that.phone = '';
                    _that.email = '';
                    _that.$store.commit('toggleOneClickState');
                });
            }
        },
        computed: {
            ...mapGetters(['oneClickState'])
        }
    }

</script>
