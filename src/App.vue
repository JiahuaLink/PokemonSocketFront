<template>
  <div id="app">
    <SocketGame/>
  </div>
</template>

<script>
import SocketGame from './components/GameView/SocketGameMenu.vue'

export default {
  name: 'App',
  components: {
    SocketGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
