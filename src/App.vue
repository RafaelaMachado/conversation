<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Satisfy|Source+Code+Pro&display=swap');

html, body, #app {
    height: 100%;
}

* {
    font-family: 'Open Sans', sans-serif;
}

pre {
    font-family: 'Source Code Pro', monospace !important;
}

$purple: #6642a8;

.form-control:focus {
    border-color: $purple !important;
    box-shadow: 0 0 0 0.2rem rgba($purple, .25) !important;
}

.btn.focus, .btn:focus {
    box-shadow: 0 0 0 0.2rem rgba($purple, .25) !important;
}

.text-30 {
    font-size: 30px;
}

.btn-link {
    color: $purple !important;
}

.btn-purple {
    background-color: $purple !important;
    color: #fff !important;
}

.create-account-callout {
    border: 1px solid #d8dee2;
    border-radius: 5px;
    padding: 15px 20px;
    text-align: center;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar:horizontal {
    height: 12px;
}

::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: rgba(#f5f5f5, .5);
    border-radius: 12px;
}

::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: rgba(#ccc, .5);
    &:hover {
        background-color: rgba(#ccc, .9);
    }
}
</style>
