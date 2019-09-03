<template>
    <div class="container-fluid h-100 p-0 d-flex" v-if="currentUser">
        <div class="w-25 sidebar">
            <div class="current-user bg-light d-flex align-items-center flex-nowrap p-2">
                <user-avatar :name="currentUser.displayName"/>
                <div class="ml-2 text-truncate">{{currentUser.displayName}}</div>
                <button class="btn btn-sm btn-link ml-auto" @click="logout"><i class="material-icons">exit_to_app</i></button>
            </div>
            <div class="channels-list bg-light p-2">
                <add-channel />
                <channel
                    v-for="(channel, index) in channels"
                    :key="`channel-${index}`"
                    :name="channel"
                    :is-active="channel === currentChannel"
                    @activate="setActiveChannel"
                    @archive="archiveChannel"
                />
            </div>
        </div>

        <div class="d-flex flex-column w-75">
            <div class="channel-header bg-light p-2 d-flex align-items-center">
                #{{ currentChannel }}
            </div>
            <div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
                <transition name="fade" mode="out-in">
                    <transition-group name="fade" v-if="messages.length">
                        <message
                            v-for="message in messages"
                            :message="message"
                            :key="`message-${message.id}`"
                            :current-user="currentUser"
                        />
                    </transition-group>
                    <div key="no-records" v-else-if="!loadingMessages" class="alert alert-secondary font-italic">No messages registered</div>
                    <div key="loading-records" class="text-center" v-else>
                        <message-loader/>
                    </div>
                </transition>
            </div>
            <message-form ref="messageForm"/>
        </div>
    </div>
</template>

<script>
import AddChannel from '@/components/AddChannel'
import Channel from '@/components/Channel'
import Message from '@/components/Message'
import MessageForm from '@/components/MessageForm'
import MessageLoader from '@/components/MessageLoader'

export default {
    name: 'Conversation',
    components: {
        AddChannel,
        Channel,
        Message,
        MessageForm,
        MessageLoader
    },
    data () {
        return {
            channelsListRef: window.firebase.firestore().collection('channels'),
            channelListener: () => {},
            channels: [],
            loadingMessages: false,
            messages: [],
            messageListener: () => {}
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
        logout () {
            window.firebase.auth().signOut()
                .then(() => {
                    this.channelListener()
                    this.$store.dispatch('setCurrentUser', null)
                    this.$router.push('/signIn')
                })
                .catch(error => {
                    console.error(error.message)
                })
        },
        setActiveChannel (channelName) {
            this.$store.dispatch('setCurrentChannel', channelName)
            this.$nextTick(() => {
                this.$refs.messageForm.$el.querySelector('textarea').focus()
            })
        },
        archiveChannel (channelName) {
            if (this.currentChannel === channelName) {
                this.setActiveChannel('todos')
            }

            window.firebase.firestore()
                .collection('channels')
                .doc(channelName)
                .set({ archived: true }, { merge: true })
        },
        loadMessages () {
            if (!this.currentChannel) return
            this.loadingMessages = true
            this.messageListener = window.firebase.firestore()
                .collection('messages')
                .doc(this.currentChannel)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((querySnapshot) => {
                    this.messages = querySnapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    })
                    this.loadingMessages = false
                    this.$nextTick(() => {
                        const animationDuration = 300
                        setTimeout(() => {
                            this.$refs.channelMessages.scrollTop = this.$refs.channelMessages.scrollHeight
                        }, animationDuration)
                    })
                })
        }
    },
    created () {
        this.channelListener = this.channelsListRef
            .where('archived', '==', false)
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                this.channels = querySnapshot.docs.map(doc => doc.id)
            })
    },
    watch: {
        currentChannel: {
            handler (currentChannel) {
                this.messageListener()
                this.loadMessages()
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
$border-color: #c2c6ca;

.channel-header {
    height: 75px;
    font-size: 1.25rem;
    border-bottom: 1px solid $border-color;
}

.channels-list {
    height: calc(100% - 75px);
    overflow-y: auto;
}

.channel-messages {
    height: calc(100% - 125px);
    overflow-y: auto;
}

.current-user {
    height: 75px;
    font-size: 1.25rem;
    border-bottom: 1px solid $border-color;
}

.fade-enter-active {
    animation: fade-in 300ms ease-out forwards;
}

.fade-leave-active {
    animation: fade-out 300ms ease-out forwards;
}

.sidebar {
    border-right: 1px solid $border-color;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
