<template>
    <div class="order-wrapper">
        <div class="top-block" v-if="!success">
            <div class="inner-container">
                <a class="back" :href="urlToCart">
                    <img src="/images/nav-arrow.svg">
                    <span>{{ backToCart }}</span>
                </a>
                <div class="title">
                    <h1>{{ checkoutPhrase }}</h1>
                </div>
            </div>
        </div>
        <div class="center-block" v-if="!success">
            <div class="col-lg-offset-1"></div>
            <div class="col-md-6 col-lg-5 col-sm-8 left-block">
                <div id="bottom-contact-form" class="checkout-form">
                    <div class="client-credentials">
                        <span>{{ nameSurname }}</span>
                        <input type="text" name="userName" v-bind:class={error:returnError(client.nameAndSurname)}
                               v-model.trim="client.nameAndSurname.value"/>
                        <span>{{ phoneNumber }}</span>
                        <input type="tel" name="userPhone" v-bind:class={error:returnError(client.phone)}
                               v-model.trim="client.phone.value"/>
                        <span>E-mail</span>
                        <input type="email" name="userEmail" v-bind:class={error:returnError(client.email)}
                               v-model.trim="client.email.value"/>
                    </div>
                    <div class="delivery-block">
                        <h4>{{ delivery }}</h4>
                        <div class="delivery-methods">
                            <div class="deliv-address">
                                <span>{{ city }}</span>
                                <input type="text" name="userCity" v-bind:class={error:returnError(client.city)}
                                       v-model.trim="client.city.value"/>
                                <span>{{ address }}</span>
                                <input type="text" name="userAddress" v-bind:class={error:returnError(client.address)}
                                       v-model.trim="client.address.value"/>
                            </div>
                            <div>
                                <span>{{ deliveryMethod }}</span>
                                <div class="checkout-message" v-if="!order.shipments.length">
                                    <span>{{ deliveryMethodsWillBeDisplayed }}</span>
                                </div>
                                <div class="delivery-block-container" v-if="order.shipments.length">
                                    <div class="delivery-block-elem"
                                         v-for="deliveryMethod in order.shipments[0].shipping_rates"
                                         v-on:click="selectDelivery(deliveryMethod)">
                                        <input type="radio" name="deliv-radio" v-bind:value="deliveryMethod.id"
                                               v-bind:checked="deliveryMethod.selected">
                                        <div class="check"></div>
                                        <label for="pickup">{{ deliveryMethod.name }}, {{ deliveryMethod.cost }}
                                            руб. </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="payment-block">
                        <h4>{{ payment }}</h4>
                        <div class="checkout-message" v-if="!order.payment_methods">
                            <span>{{ paymentMethodsWillBeDisplayed }}</span>
                        </div>
                        <div class="payment-methods" v-if="order.payment_methods">
                            <div class="payment-container">
                                <div class="payment-block-elem" v-for="paymentMethod in order.payment_methods"
                                     v-on:click="selectPayment(paymentMethod)">
                                    <input type="radio" v-bind:id="paymentMethod.id" name="payment"
                                           v-bind:checked="isSelectedPayment(paymentMethod)">
                                    <div class="check"></div>
                                    <label for="cardOnline">{{ paymentMethod.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment-block">
                        <h4>{{ commentToOrder }}</h4>
                        <textarea name="order[special_instructions]" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button type="submit"
                            :class="paymentReady ? 'add-order active' : 'add-order'"
                            @click="sendPaymentInfo(selectedPayment.id)">
                        <span>{{ completeOrder }}</span>
                    </button>
                </div>
            </div>
            <div class="col-md-offset-1 col-lg-offset-1"></div>
            <div class="col-md-5 col-lg-4 right-block">
                <div class="check-container">
                    <div class="inner-container">
                        <h3>{{ yourOrder }}:</h3>
                        <item :items="items"></item>
                        <div class="deliv-block">
                            <h5>{{ delivery }}</h5>
                            <span class="deliv-address"><span
                                    v-if="client.address.value && client.city.value">{{ client.city.value }}, {{ client.address.value }}</span></span>
                            <span class="dev-option">{{ demonstratedShipmentCost }}</span>
                        </div>
                        <div class="final-sum">
                            <span>{{ paymentAmount }}:</span>
                            <span class="sum-val">{{ spacing(totalPrice) }} руб.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-offset-1"></div>
        </div>
        <success-state v-if="success"
                       :title="orderIsCompleted"
                       :message="orderSuccessMessage"
                       goBackLink="/"
                       :goHomePhrase="goHomePhrase"
                       :order="order"
                       :isYandexKassa="isYandexKassa"
                       :payWithWebpay="payWithWebpay"
        ></success-state>
    </div>
</template>
<script>
    import Item from './order-item.vue';
    import SuccessState from './info-template.vue';
    import {mapGetters} from 'vuex';
    import {displayedPrice} from './../mixins/displayedPrice.js'

    export default {
        props: {
            backToCart: String,
            checkoutPhrase: String,
            goHomePhrase: String,
            orderIsCompleted: String,
            orderSuccessMessage: String,
            completeOrder: String,
            nameSurname: String,
            phoneNumber: String,
            commentToOrder: String,
            delivery: String,
            city: String,
            address: String,
            deliveryMethod: String,
            deliveryMethodsWillBeDisplayed: String,
            payment: String,
            paymentAmount: String,
            paymentMethodsWillBeDisplayed: String,
            yourOrder: String,
            free: String,
            spreeCurrentOrderId: String,
            spreeCurrentOrderToken: String,
            isYandexKassa: String,
            orderJson: String,
            payWithWebpay: String
        },
        mixins: [displayedPrice],
        components: {Item, SuccessState},
        data() {
            return {
                client: {
                    nameAndSurname: {
                        value:
                            JSON.parse(this.orderJson).bill_address
                            && JSON.parse(this.orderJson).bill_address.firstname
                            && JSON.parse(this.orderJson).bill_address.lastname ?
                                JSON.parse(this.orderJson).bill_address.firstname +
                                ' ' + JSON.parse(this.orderJson).bill_address.lastname : '',
                        dirty: false,
                        isError: false,
                        rule: 'required_with_space'
                    },
                    phone: {
                        value:
                            JSON.parse(this.orderJson).bill_address
                            && JSON.parse(this.orderJson).bill_address.phone ?
                                JSON.parse(this.orderJson).bill_address.phone : '',
                        dirty: false,
                        isError: false,
                        rule: 'phoneNumberRegex'
                    },
                    email: {
                        value: JSON.parse(this.orderJson).email ? JSON.parse(this.orderJson).email : '',
                        dirty: false,
                        isError: false,
                        rule: 'email'
                    },
                    city: {
                        value: JSON.parse(this.orderJson).bill_address
                        && JSON.parse(this.orderJson).bill_address.city ?
                            JSON.parse(this.orderJson).bill_address.city : '',
                        dirty: false,
                        isError: false,
                        rule: 'required',
                        location: ''
                    },
                    address: {
                        value: JSON.parse(this.orderJson).bill_address
                        && JSON.parse(this.orderJson).bill_address.address1 ?
                            JSON.parse(this.orderJson).bill_address.address1 : '',
                        dirty: false,
                        isError: false,
                        rule: 'required',
                        location: ''
                    }
                },
                cityVariants: '',
                shipmentCost: 0,
                selectedPayment: '',
                items: JSON.parse(this.orderJson).line_items ? JSON.parse(this.orderJson).line_items : '',
                order: JSON.parse(this.orderJson),
                success: false,
                local: window
            }
        },
        watch: {
            client: {
                handler() {
                    let errorCount = 0;
                    for (let [key] of Object.entries(this.client)) {
                        // make dirty
                        if (this.client[key].value) {
                            this.client[key].dirty = true;
                        }
                        // validate
                        let func = this.client[key].rule;
                        try {
                            this[func](this.client[key]);
                        } catch (e) {
                            errorCount++;
                        }
                    }
                    if (!errorCount) {
                        this.addressReadyCheck();
                    }
                },
                deep: true
            }
        },
        created() {
            this.addressReadyCheck();
        },
        methods: {
            addressReadyCheck() {
                let errorCount = 0;
                for (let [key] of Object.entries(this.client)) {
                    // validation
                    try {
                        // rule
                        this[this.client[key].rule](this.client[key]);
                        // fulfillment
                        if (!this.client[key].value) {
                            throw new Error();
                        }
                    } catch (e) {
                        errorCount++
                    }
                }
                if (!errorCount) {
                    this.proceedToDeliveryState();
                }
            },
            proceedToDeliveryState: _.debounce(function (resolve, reject) {
                let request = {
                    'order': {
                        'email': this.client.email.value,
                        'bill_address_attributes': {
                            'firstname': this.name,
                            'lastname': this.surname,
                            'address1': this.client.address.value,
                            'city': this.client.city.value,
                            'phone': this.client.phone.value,
                            'country_id': '1'
                        },
                        'use_billing': '1'
                    }
                };
                // Force to NEXT and update vue's order.json
                let _that = this;
                $.ajax({
                    url: _that.locale + '/api/v1/orders/' + this.spreeCurrentOrderId + '.json?order_token=' + this.spreeCurrentOrderToken,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(request)
                }).then((response) => {
                    _that.order.state = response.state;
                    if (response.state == 'cart' || response.state == 'address') {
                        $.ajax({
                            url: _that.locale + '/api/v1/checkouts/' + _that.spreeCurrentOrderId + '/next.json?order_token=' + _that.spreeCurrentOrderToken,
                            type: 'PUT',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json'
                        }).then((response) => {
                            _that.order.state = response.state;
                            // if it's still address and not delivery
                            if (response.state === 'address') {
                                _that.proceedAddressToDeliveryState();
                            } else {
                                _that.order.shipments = response.shipments;
                                _that.sendDeliveryMethod();
                            }
                        });
                    }
                });
            }, 1000),
            proceedAddressToDeliveryState() {
                $.ajax({
                    url: this.locale + '/api/v1/checkouts/' + this.spreeCurrentOrderId + '/next.json?order_token=' + this.spreeCurrentOrderToken,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                }).then((response) => {
                    this.order.shipments = response.shipments;
                    this.sendDeliveryMethod();
                });
            },
            returnError(item) {
                return item.isError;
            },
            required(item) {
                if (!item.value && item.dirty) {
                    item.isError = true;
                    throw new Error();
                } else {
                    item.isError = false;
                }
            },
            phoneNumberRegex(item) {
                const regex = /^(?=.*[0-9])[- +()0-9]+$/;
                if (!regex.test(item.value) && item.dirty) {
                    item.isError = true;
                    throw new Error();
                } else {
                    item.isError = false;
                }
            },
            required_with_space(item) {
                const regex = /^([a-zA-Z\u0400-\u04FF])+\ ([a-zA-Z\u0400-\u04FF])+/;
                if (!regex.test(item.value) && item.dirty) {
                    item.isError = true;
                    throw new Error();
                } else {
                    item.isError = false;
                }
            },
            email(item) {
                const regex = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (!regex.test(item.value) && item.dirty) {
                    item.isError = true;
                    throw new Error();
                } else {
                    item.isError = false;
                }
            },
            selectDelivery: _.debounce(function (shipmentRate) {
                this.order.state = 'cart';
                this.refreshDeliveryScreen(shipmentRate);
                let updateAddress = new Promise((resolve, reject) => {
                    this.proceedToDeliveryState(resolve, reject);
                });
                updateAddress.then(() => {
                    this.sendDeliveryMethod(shipmentRate);
                });
            }, 500),
            refreshDeliveryScreen(shipmentRate) {
                this.order.shipments[0].shipping_rates.forEach((item) => {
                    item.selected = false;
                    if (item.shipping_method_id === shipmentRate.shipping_method_id) {
                        shipmentRate.id = item.id;
                        item.selected = true;
                    }
                });
            },
            sendDeliveryMethod(shipmentRateProp) {
                if (!!this.order.shipments.length) {
                    let shipmentRate = shipmentRateProp ? shipmentRateProp : this.order.shipments[0].selected_shipping_rate;
                    this.refreshDeliveryScreen(shipmentRate);
                    this.shipmentCost = parseFloat(shipmentRate.cost);
                    let deliveryRequest = {
                        order: {
                            shipments_attributes: {
                                0: {
                                    selected_shipping_rate_id: shipmentRate.id,
                                    id: this.order.shipments[0].id
                                }
                            }
                        }
                    };
                    let url = this.locale + '/api/v1/checkouts/' +
                        this.spreeCurrentOrderId + '.json?order_token=' +
                        this.spreeCurrentOrderToken;
                    $.ajax({
                        url: url,
                        type: 'PUT',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify(deliveryRequest)
                    }).then((response) => {
                        this.order = response;
                    });
                }
            },
            selectPayment(paymentMethod) {
                this.selectedPayment = paymentMethod;
            },
            isSelectedPayment(paymentMethod) {
                if (paymentMethod.id === this.selectedPayment.id) {
                    return true;
                } else {
                    return false;
                }
            },
            sendPaymentInfo(selectedPaymentId) {
                if (this.paymentReady) {
                    if (this.order.state == 'payment') {
                        let paymentRequest = {
                            order: {
                                'payments_attributes': [{
                                    'payment_method_id': selectedPaymentId
                                }]
                            },
                            payment_source: {}
                        };
                        paymentRequest.payment_source[selectedPaymentId] = {};
                        $.ajax({
                            url: this.locale + '/api/v1/checkouts/' + this.spreeCurrentOrderId + '.json?order_token=' + this.spreeCurrentOrderToken,
                            type: 'PUT',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            data: JSON.stringify(paymentRequest)
                        }).then(response => {
                            this.order = response;
                            this.success = true;
                            this.$store.commit('updateCartItemsQuantity', '0');
                            window.scrollTo(0, 0);
                        });
                    }
                }
            }
        },
        computed: {
            ...
                mapGetters(['locale']),
            totalPrice() {
                let totalPrice = 0;
                $.each(this.items, function () {
                    totalPrice = totalPrice + Number(this.price) * Number(this.quantity);
                });
                totalPrice += parseInt(this.shipmentCost) || 0;
                return totalPrice.toFixed(2).replace('.', ',');
            },
            name() {
                return this.client.nameAndSurname.value.split(' ')[0];
            },
            surname() {
                return this.client.nameAndSurname.value.split(' ')[1];
            },
            countryAndCity() {
                if (_.has(this, this.client.city.location.address_components)) {
                    let city = this.client.city.location.address_components;
                    return city[city.length - 1].long_name + ', ' + city[0].long_name;
                } else {
                    return '';
                }
            },
            demonstratedShipmentCost() {
                if (this.shipmentCost > 0) {
                    let sum = this.spacing(this.shipmentCost.toFixed(2).replace('.', ','));
                    return sum + ' руб.';
                } else {
                    return this.free;
                }
            },
            urlToCart() {
                return this.locale + '/my-cart';
            },
            paymentReady() {
                if (this.selectedPayment && this.order.state === 'payment') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>