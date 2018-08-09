<template>
    <div>
        <info-template
                :title="success ? successTitle : errorTitle"
                :message="success ? successMessage : errorMessage"
                :go-home-phrase="goHomePhrase"
                go-back-link="/"
                order="">
        </info-template>
    </div>
</template>
<script>
    import InfoTemplate from './info-template';

    export default {
        props: [
            'go-home-phrase',
            'success-title',
            'error-title',
            'success-message',
            'error-message'
        ],
        components: {InfoTemplate},
        computed: {
            success() {
                if (window.location.href.includes('error')) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>