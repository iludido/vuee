<template>
  <button @click="increment">ADD</button>
  {{ $store.state.counter.count }}
  <hr>

  <h2>Users</h2>

  <template v-if="$store.state.users.data.length > 0">
    <button @click="$store.dispatch('users/hideUsers')">Hide users</button>
    <ul>
      <li v-for="(user, index) in $store.state.users.data" :key="index">
        {{ user.firstName }}
      </li>
    </ul>
  </template>
  <template v-else>
    <button @click="$store.dispatch('users/getUsers')">Get users</button>
  </template>
</template>


<script>
export default {
  methods: {
    increment() {
      this.$store.commit('counter/increment', 10)
    }
  },
}
</script>
