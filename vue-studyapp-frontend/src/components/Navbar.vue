<template>
  <div>
    <b-navbar
        toggleable="md"
        type="dark"
        variant="info">
      <b-navbar-brand :to="{ name: 'Home' }" v-if="authenticated">Home</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'AddEvent' }" v-if="authenticated">Create new</b-nav-item>
        <b-nav-item :to="{ name: 'ListEvent' }" v-if="authenticated">Discover</b-nav-item>
        <b-nav-item :to="{ name: 'Users' }" v-if="authenticated">Users</b-nav-item>
        <b-nav-item :to="{ name: 'LoginForm' }" v-if="!authenticated">Login</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav right>
        <b-nav-item :to="{ name: 'LoginForm' }" v-if="authenticated" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    logout() {
      this.$emit('logout:auth', this.authenticated)
    }
    /*addNewEvent(event) {
      const lastId =
          this.events.length > 0
              ? this.events[this.events.length - 1].id
              : 0;
      const id = lastId + 1;
      const newEvent = { ...event, id };

      this.events = [...this.events, newEvent]
    }*/
  }
}

</script>

<style scoped>

</style>