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
                                <input type="text" id="name" class="form-control" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" id="email" class="form-control" placeholder="Email address">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <label for="password-confirm">Password Confirmation</label>
                                <input type="password" class="form-control" id="password-confirm" placeholder="Password Confirmation">
                            </div>
                            <button type="button" class="btn btn-purple btn-block" >Create an account</button>
                        </form>
                    </div>
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
    name: 'SignUp'
}
</script>