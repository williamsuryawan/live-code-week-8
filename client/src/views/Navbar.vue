<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="/">From NASA with love</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                        </li>
                    </ul>
                </div>

                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" v-if="!isLogin" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                        <a href="#" class="nav-link" v-if="isLogin" @click.prevent="logOut">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from 'sweetalert2'

export default {
  name: 'navbar',
  computed: {
    ...mapState(["isLogin"])
  },
  created() {
    if (!localStorage.getItem('token')) {
      this.$store.commit('updateLoginState',{boolean: false})
    } else {
      this.$store.commit('updateLoginState',{boolean: true})
    }
  },
  methods: {
      logOut() {
        console.log("masuk ke konfirmasi logout")
        Swal.fire({
            title: 'Do you want to log out?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        })
        .then(result => {
          if (result.value) {
            console.log(" logout berhasil")
            localStorage.clear()
            this.$store.commit('updateLoginState',{boolean: false})
            this.$router.push('/');
          }
        })
      },
      inviteLogin() {
          Swal.fire({
            position: 'top-end',
            type: 'info',
            title: 'You need to login to add/show your cart',
            showConfirmButton: false,
            timer: 1500
        })
      },
      showAllArticle() {
        this.$router.push(`/questions/`)
        // this.$store.dispatch('getAllQuestions')
        this.$store.commit('updateAllQuestionsState', {boolean: true})
        this.$store.commit('updateQuestionsDetailState', {boolean: false})
      }
  }
};
</script>