<template>
    <div class="message-form d-flex align-items-center bg-light">
        <textarea placeholder="Enter your message here" class="bg-light" ref="textarea"/>
        <button class="btn btn-sm btn-purple border-left">
            <i class="material-icons">message</i>
        </button>
    </div>
</template>

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
