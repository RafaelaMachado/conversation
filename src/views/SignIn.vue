<template>
    <div class="d-flex flex-column justify-content-center align-items-center h-100 bg-light">
        <div class="row w-100">
            <div class="col col-sm-12 col-md-4 offset-md-4">
                <div class="col text-center text-30 pb-2">
                    Sign In to Conversations
                </div>
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="password" @keyup.enter="signIn">
                            </div>
                            <button type="button" class="btn btn-purple btn-block" :disabled="isLoading" @click="signIn">Sign In</button>
                        </form>
                    </div>
                </div>
                <div class="mt-2 alert alert-danger" v-if="errors.length">
                    <div v-for="(error, index) in errors" :key="`error-${index}`"> {{error}}</div>
                </div>
                <div class="mt-2 text-center create-account-callout">
                    New to Conversations? <router-link to="/signUp">Create an account.</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignIn',
    data () {
        return {
            email: '',
            password: '',
            errors: [],
            isLoading: false
        }
    },
    methods: {
        signIn () {
            this.errors = []
            if (this.isLoading || !this.isFormValid()) return
            this.isLoading = true
            window.firebase.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    this.$store.dispatch('setCurrentUser', user)
                    this.$router.push('/')
                })
                .catch(error => {
                    this.errors.push(error.message)
                    this.isLoading = false
                })
        },
        isFormValid () {
            if (!this.email.length || !this.password.length) {
                this.errors.push('All fields are required')
                return false
            }
            return true
        }
    }
}
</script>
