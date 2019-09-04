<template>
    <div class="message-form d-flex align-items-center bg-light">
        <textarea placeholder="Enter your message here" class="bg-light" v-model.trim="message" @keydown.enter.prevent="sendMessage" @keyup="detectIfUserIsTyping" ref="textarea"/>
        <button @click="sendMessage" class="btn btn-sm btn-purple border-left">
            <i class="material-icons">message</i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'MessageForm',
    data () {
        return {
            message: '',
            usersRef: window.firebase.firestore().collection('users')
        }
    },
    computed: {
        currentUser () {
            return this.$store.getters.currentUser
        },
        currentChannel () {
            return this.$store.getters.currentChannel
        }
    },
    methods: {
        sendMessage () {
            if (!this.message) return
            window.firebase.firestore()
                .collection('messages')
                .doc(this.currentChannel)
                .collection('messages')
                .add({
                    content: this.message,
                    timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
                    user: {
                        name: this.currentUser.displayName,
                        id: this.currentUser.uid
                    }
                })
                .then(() => {
                    this.message = ''
                    this.detectIfUserIsTyping()
                    this.$nextTick(() => {
                        this.$refs.textarea.focus()
                    })
                })
        },
        detectIfUserIsTyping () {
            if (this.message !== '') {
                if (!this.isTyping) {
                    this.usersRef.doc(this.currentUser.uid).set({ isTyping: true }, { merge: true })
                }
                this.isTyping = true
                return
            }
            this.isTyping = false
            this.usersRef.doc(this.currentUser.uid).set({ isTyping: false }, { merge: true })
        }
    }
}
</script>

<style lang="scss">
.message-form {
    background-color: #fff;
    border-top: 1px solid #c2c6ca;
    height: 50px;

    textarea {
        padding: 0.70rem 1rem;
        height: 46px;
        width: calc(100% - 50px) ;
        border: 0;
        resize: none;
        border-radius: 0;

        &::placeholder {
            font-style: italic;
            font-size: 15px;
        }

        &:focus {
            outline: none;
        }
    }

    button {
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0;

        &:focus {
            box-shadow: none !important;
        }
    }
}
</style>
