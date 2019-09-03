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
                <channel v-for="i in 5" :key="`channel-teste-${i}`" :name="`channel-teste-${i}`"/>
            </div>
        </div>

        <div class="d-flex flex-column w-75">
            <div class="channel-header bg-light p-2 d-flex align-items-center">
            </div>
            <div class="channel-messages flex-grow-1 p-2" ref="channelMessages">
                <message-loader />
                <message v-for="message in messages" :message="message" :key="`message-${message.id}`" :current-user="currentUser"/>
            </div>
            <message-form />
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
            messages: []
        }
    },
    computed: {
        currentUser () {
            return this.$store.getters.currentUser
        }
    },
    methods: {
        logout () {
            window.firebase.auth().signOut()
                .then(() => {
                    this.$store.dispatch('setCurrentUser', null)
                    this.$router.push('/signIn')
                })
                .catch(error => {
                    console.error(error.message)
                })
        }
    },
    created () {
        for (let i = 1; i <= 5; i++) {
            this.messages.push({
                id: i,
                content: `Mensage ${i}`,
                timestamp: Date.now(),
                user: {
                    id: 1,
                    name: 'Rafaéla Machado'
                }
            })
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
