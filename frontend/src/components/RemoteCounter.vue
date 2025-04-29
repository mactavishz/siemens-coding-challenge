<script lang="ts">
import { ref } from 'vue'
import { io } from 'socket.io-client'
export default {
  setup() {
    const count = ref(0)
    const error = ref(null)

    function increment() {
      count.value++
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
    const socket = io(backendUrl, {
      withCredentials: true,
    })
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    return {
      count,
      increment,
      error
    }
  }
}
</script>

<template>
  <div class="counter">
    <h2>Current Counter Value: {{ count }}</h2>
    <button
      class="btn"
      @click="increment"
    >
      Increment
    </button>
  </div>
  <div v-if="error" class="error">
    <p>Error: {{ error }}</p>
  </div>
</template>

<style lang="css" scoped>
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  flex: 0 0 auto;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
}
</style>
