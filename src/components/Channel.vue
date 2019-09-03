<template functional>
    <div class="d-flex channel rounded p-1 mb-1" :class="{'is-active': props.isActive}">
        <div class="w-100" @click="listeners.activate(props.name)">#{{props.name}}</div>
        <button
            title="Archive"
            type="button"
            class="ml-auto d-flex align-items-center btn btn-link btn-sm p-0"
            v-if="props.name !== 'todos'"
            @click="listeners.archive(props.name)"
        >
            <i class="material-icons">archive</i>
        </button>
    </div>
</template>

<style lang="scss">
$border-color: #c2c6ca;
.channel {
    border: 1px solid $border-color;
    align-items: center;
    cursor: pointer;

    &.is-active {
    background-color: #fff;
        border-color: #fe8e2a;
    }

    &:not(.is-active):hover {
        background-color: #f1f1f1;
    }
}
</style>
