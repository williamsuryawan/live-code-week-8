<template>
    <div>
        <div class="card-body">
            <h2 class="card-title"><u>{{ apod.title }}</u></h2>
            <div class="card-text">
                <h4>Description</h4> {{ apod.desc }}
                <br/><br/><br/>
                <h4>Date of picture</h4> {{ apod.date }}
            </div>
        </div>
    </div>
</template>


<script>
import server from '@/api/server.js'

export default {
    name: 'apod-detail',
    data() {
        return {
            apod: {}
        }
    },
    methods: {
        fetchDetail() {
            console.log("masuk method apod detail", this.$route.params.id)
            server
                .get(`/myapods/${this.$route.params.id}`, {headers: {accesstoken: localStorage.getItem("token")
                    }})
                .then(({ data }) => {
                    console.log("berhaasil method apod detail")
                    this.apod = data;

                })
                .catch((err) => {
                    console.log("error fetch detail", err);

                });
            },
    },
    mounted() {
        this.fetchDetail();
    },
    watch: {
        $route() {
            this.fetchDetail();
        },
    }
}
</script>
