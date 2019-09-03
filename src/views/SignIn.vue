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
                                <input type="email" id="email" class="form-control" placeholder="Email address">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Password">
                            </div>
                            <button type="button" class="btn btn-purple btn-block" >Sign In</button>
                        </form>
                    </div>
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
    name: 'SignIn'
}
</script>
