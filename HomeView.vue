<template>
  <input type="text" placeholder="Search" id="teste" @keyup="search">

  <ul>
    <li v-for="(user, index) in users.data" :key="index">{{ user.firstName }} {{ user.lastName }}</li>
  </ul>

  <Bootstrap5Pagination :data="users" @pagination-change-page="getUsers"></Bootstrap5Pagination>

  <div v-html="userNotFound"></div>
</template>

<script>
import http from '@/services//http';
import _ from 'lodash';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
  components: { Bootstrap5Pagination },
  data() {
    return {
      users: [],
      loading: true
    }
  },

  computed: {
    userNotFound() {
      return (!this.loading && this.users.length <= 0) ? '<span id="NotFound">Nenhum user encontrado</span>' : ''
    }
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    async getUsers(page = 1) {
      console.log(page);
      try {
        const { data } = await http.get('/api/users?page=' + Number(page));
        this.loading = false;
        console.log(data)
        this.users = data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    search: _.debounce(async function (event) {
      try {

        const { data } = await http.get('/api/users/search', {
          params: {
            user: event.target.value
          }
        })
        this.users = data
      } catch (error) {
        console.log(error.responde.data);
      }
      console.log(event.target.value);
    }, 1000)
  },
}
</script>

<style>
#NotFound {
  color: red;
}
</style>