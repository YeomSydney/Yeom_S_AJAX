import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                message: 'Hello Vue!'
            }
        },

        methods: {
            // processMailFailure & processMailSuccess have be concered.
            
            processMailFailure(result) {
                // show a failure message in the UI
                // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
                alert('failure! and if you keep using an alert, DOUBLE failure!');        
                // show some errors in the UI here to let the user know the mail attempt was successful

                // DO NOT USE THIS ALERT METHOD. or it's a big fat 0

                // use the vue $refs object to find and mark fields that are broken (they'll be listed in the result argument)
            },

            processMailSuccess(result) {
                // show a success message in the UI
                alert("success! but don't EVER use alerts. They are gross.");        
                // show some UI here to let the user know the mail attempt was successful
                // DO NOT USE THIS ALERT METHOD. or it's a big fat 0

                // use a different method of showing mail success. Get creative with it.
            },

            processMail(event) {        
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();