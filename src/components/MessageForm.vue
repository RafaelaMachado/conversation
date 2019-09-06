<template>
    <div class="message-form d-flex align-items-center bg-light">
        <textarea
            placeholder="Enter your message here"
            class="bg-light regular-input"
            v-model.trim="message"
            @keydown.enter.prevent="sendMessage"
            @keyup="detectIfUserIsTyping"
            ref="textarea"
        />
        <emoji-picker @emoji="insert">
            <div
                class="emoji-invoker"
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
            >
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                <div class="emoji-picker">
                    <div>
                        <div v-for="(emojiGroup, category) in emojis" :key="category">
                            <h5>{{ category }}</h5>
                            <div class="emojis">
                                <span
                                    v-for="(emoji, emojiName) in emojiGroup"
                                    :key="emojiName"
                                    @click="insert(emoji)"
                                    :title="emojiName"
                                >{{ emoji }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </emoji-picker>

        <button @click="sendMessage" class="btn btn-sm btn-purple border-left">
            <i class="material-icons">message</i>
        </button>
    </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'

export default {
    name: 'MessageForm',
    components: {
        EmojiPicker
    },
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
        insert (emoji) {
            this.message += emoji
        },
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
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
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

.regular-input:focus {
    box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
    position: absolute;
    bottom: 15px;
    right: 60px;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
}
.emoji-invoker:hover {
    transform: scale(1.1);
}

.emoji-invoker > svg {
    fill: #b1c6d0;
}

.emoji-picker {
    position: absolute;
    right: 10px;
    bottom: 50px;
    z-index: 1;
    font-family: Montserrat;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    overflow: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
}

.emoji-picker h5 {
    margin-bottom: 0;
    color: #b1b1b1;
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: default;
}

.emoji-picker .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.emoji-picker .emojis:after {
    content: '';
    flex: auto;
}

.emoji-picker .emojis span {
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
}

.emoji-picker .emojis span:hover {
    background: #ececec;
    cursor: pointer;
}
</style>
