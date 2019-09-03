<template>
    <div>
        <div class="text-center">
            Channels
            <button title="Add channels" class="btn btn-sm btn-link toggle-add-button" @click="toggleAddChannel"><i class="material-icons">add_circle_outline</i></button>
        </div>
        <transition name="fade">
            <div v-if="isAdding" class="d-flex p-1 mb-1 border rounded add-channel-container">
                #<input
                    maxlength="32"
                    type="text"
                    class="new-channel ml-1"
                    ref="addChannelInput"
                />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: '',
            isAdding: false
        }
    },
    methods: {
        toggleAddChannel () {
            this.isAdding = !this.isAdding

            if (!this.isAdding) return
            this.$nextTick(() => {
                this.$refs.addChannelInput.focus()
            })
        }
    }
}
</script>

<style lang="scss">
.new-channel {
    border: 0;
    outline: none;
    width: 100%;
    background-color: transparent;
}

.add-channel-container {
    border-color: #fe8e2a !important;
}

.toggle-add-button:focus {
  box-shadow: none !important;
}
</style>
