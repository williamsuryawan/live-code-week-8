<template>
    <div class="container my-4">
        <div class="jumbotron">
            <div class="row justify-content-center text-center">
                <div class="col-6">
                    <div>
                        <h2>Add Astronomy Picture</h2>
                        <p>
                            <em>Please input date </em>, etc.
                        </p>
                        <form method="post" class="input-group">
                            <datepicker v-model="inputDate" name="uniquename"></datepicker>
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="submit" @click.prevent="addApods">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-6">
                <form method="post" class="input-group mb-3">
                    <input
                    type="text"
                    name="search"
                    id="search"
                    class="form-control"
                    autocomplete="off"
                    placeholder="Search..."
                    v-model="inputSearch" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit" @click.prevent="filterApod">
                            Search
                        </button>
                    </div>
                </form>
                <div class="card mt-2" v-if="apodslist.length>0">
                    <div class="card-body" v-for="apod in apodslist" :key="apod._id">
                        <h5 class="card-title"> {{ apod.title }}</h5>

                        <div>
                            <!-- FOR VIDEO -->
                            <iframe width="498" height="332" v-if="apod.mediaType=='video'" v-bind:src="apod.url"></iframe>

                            <!-- FOR IMAGE -->
                            <img class="card-img-top" v-else v-bind:src="apod.url" alt="Card image cap">
                        </div>

                        <div class="mt-3">
                            <router-link
                                :to="'/apods/' + apod._id "
                                class="btn btn-outline-primary">See detail</router-link>
                            <a href="#" class="btn btn-danger" @click.prevent="deleteApod(apod._id)">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card" id="detail">
                    <div class="card-header">
                        Detail
                    </div>
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Datepicker from 'vuejs-datepicker';
// import ApodDetail from '@/components/ApodDetail.vue';

export default {
    name: 'login',
    data() {
        return {
            apodslist:[],
            inputDate: '',
            inputSearch: ''
        }
    },
    components: {
        Datepicker
    },
    created() {
        console.log("main page apods created")
        this.fetchData();
    },
    methods: {
        fetchData() {
            console.log("masuk fetch")
        server
            .get("/myapods", {headers: {accesstoken: localStorage.getItem("token")
                }})
            .then(result => {
                console.log("berhasil fetch data", result.data.data)
                this.apodslist = result.data.data
            })
            .catch(err => {
                console.log("terjadi error fetch data", err)
            })
        },
        addApods() {
            console.log("masuk add apods", this.inputDate)
            let stringDate = this.inputDate.toISOString().slice(0,10)
            console.log("input date", stringDate)
            server
                .post("/apods", {
                    other: 'true',
                    date: stringDate
                }, {headers: {accesstoken: localStorage.getItem("token")
                    }})
            .then(result => {
                console.log("berhasil save", result.data.data)
                this.apodslist.push(result.data.data)
                this.fetchData();
            })
            .catch(err => {
                console.log("terjadi error fetch data", err)
            })

        },
        deleteApod (input) {
            server
                .delete(`/apods/${input}`, {headers: {accesstoken: localStorage.getItem("token")
                    }})
            .then(result => {
                console.log("berhasil delete", result.data)
                this.fetchData();
            })
            .catch(err => {
                console.log("terjadi error fetch data", err)
            })
        },
        filterApod () {
            console.log("masuk filter apods", this.inputSearch, this.apodslist)
            if(this.inputSearch) {
                let filteredData = this.apodslist.filter((obj) => {
                return obj['title'] == this.inputSearch;
                });
                this.apodslist = filteredData
                console.log("hasil filter",  filteredData)
            } else  if (this.inputSearch == ''){

                this.fetchData()
            } else {
                this.fetchData()
            }
        }    
    }

}
</script>

