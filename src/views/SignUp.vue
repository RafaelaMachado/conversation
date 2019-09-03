<template>
    <div class="d-flex flex-column justify-content-center align-items-center h-100 bg-light">
        <div class="row w-100">
            <div class="col col-sm-12 col-md-4 offset-md-4">
                <div class="col text-center text-cursive text-30 pb-2">
                    Sign Up to Conversations
                </div>
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" class="form-control" placeholder="Name" v-model.trim="name">
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="password">
                            </div>
                            <div class="form-group">
                                <label for="password-confirm">Password Confirmation</label>
                                <input type="password" class="form-control" id="password-confirm" placeholder="Password Confirmation" v-model.trim="passwordConfirm" @keyup.enter="register">
                            </div>
                            <button type="button" class="btn btn-purple btn-block" :disabled="isSaving" @click="register">Create an account</button>
                        </form>
                    </div>
                </div>
                <div class="mt-2 alert alert-danger" v-if="errors.length">
                    <div v-for="(error, index) in errors" :key="`error-${index}`"> * {{error}} </div>
                </div>
                <div class="mt-2 text-center create-account-callout">
                    You have an account? <router-link to="/signIn">Sign In.</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data () {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: [],
            isSaving: false,
            usersRef: window.firebase.firestore().collection('users')
        }
    },
    methods: {
        isFormValid () {
            const hasEmptyFields = ['name', 'email', 'password', 'passwordConfirm'].some(field => this[field].length === 0)
            if (hasEmptyFields) {
                this.errors.push('All fields are required')
                return false
            }

            if (this.password !== this.passwordConfirm) {
                this.errors.push('Password and confirmation are different')
                return false
            }

            return true
        },
        register () {
            this.errors = []
            if (this.isSaving || !this.isFormValid()) return
            this.isSaving = true
            window.firebase.auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(({ user }) => {
                    user
                        .updateProfile({
                            username: this.name
                        })
                        .then(() => {
                            this.usersRef.doc(user.uid)
                                .set({
                                    id: user.uid,
                                    email: user.email,
                                    name: user.username
                                })
                                .then(() => {
                                    this.$store.dispatch('setCurrentUser', user)
                                    this.$router.push('/')
                                })
                        })
                        .catch(error => {
                            this.errors.push(error.message)
                        })
                        .finally(() => (this.isSaving = false))
                })
                .catch(error => {
                    this.errors.push(error.message)
                })
                .finally(() => (this.isSaving = false))
        }
    }
}
</script>
