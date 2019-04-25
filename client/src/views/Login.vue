<template>
    <div class="container my-4">
        
        <div class="row justify-content-center">
        <div class="col-4">
          <div class="card mb-4">
            <div class="card-header text-center">Login</div>
            <div class="card-body">
              <form method="post" @submit.prevent="userLogin">
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="loginEmail">
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    v-model="loginPassword">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
    </div>
    </div>
</template>


<script>
import server from '@/api/server.js'

export default {
  name: 'login',
  data() {
      return {
          loginEmail: '',
          loginPassword: '',
      }
  },
  methods: {
      userLogin () {
          console.log("masuk ke login ==>", this.loginEmail, this.loginPassword)
          server
            .post("/login", {
                email: this.loginEmail,
                password: this.loginPassword,
            })
            .then(({data}) => {
                console.log("sign in berhasil", data)
                localStorage.setItem("token", data.accessToken)
                this.$store.commit('updateLoginState',{boolean: true})
                this.$router.push('/apods');
            })
            .catch(({ response }) => {
                console.log("sign in error")
                this.errors = response.data.message
                this.isErrorLogin = true;
            })
      }
      
  }
};
</script>