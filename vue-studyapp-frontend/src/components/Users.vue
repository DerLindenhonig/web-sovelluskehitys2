<template>
  <div id="list_event">
    <p class="homeText">Users</p>
    <table>
      <thead>
      <tr>
        <th>Username</th>
        <th>Name</th>
        <th>Level</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.level }}</td>
        <td><router-link :to="{ path: '/user/' + user.id }" v-bind:users="users"><b-button variant="info">Open</b-button></router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Users',
  props: {
    users: Array,
  },
  created() {
    console.log('users: this.users ' + this.users)
  }
};
</script>

<style scoped>
.homeText{
  font-size: 30px;
  color: #212121;
  text-align: center;
  position: relative;
  padding:30px 30px 10px 30px;
}
</style>