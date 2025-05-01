<script lang="ts">
import { onMounted, ref } from 'vue'
import { io } from 'socket.io-client'
import apis from '@/apis'
import type { GetCounterResponse } from '@/apis'

export default {
  setup() {
    const count = ref<number>(0)
    const error = ref<string>('')

    function setCounter(newCount: number) {
      count.value = newCount
    }

    function onClearErr() {
      error.value = ''
    }

    function onClick() {
      apis
        .incrementCounter()
        .then(() => {
          console.log('Counter incremented')
        })
        .catch((err) => {
          error.value = err.message
        })
    }

    onMounted(() => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
      const socket = io(backendUrl, {
        withCredentials: true,
      })

      socket.on('connect', () => {
        console.log('Connected to server')
      })

      socket.on('counterUpdate', (newCount: number) => {
        setCounter(newCount)
      })

      apis
        .getCounter()
        .then((data: GetCounterResponse) => {
          count.value = data.value
        })
        .catch((err) => {
          error.value = err.message
        })
    })

    return {
      count,
      error,
      onClick,
      onClearErr,
    }
  },
}
</script>

<template>
  <div class="counter">
    <h2>Current Counter Value: {{ count }}</h2>
    <button class="btn" @click="onClick">Increment</button>
  </div>
  <div v-if="error" class="error">
    <p>{{ error }} <span class="error-close-btn" @click="onClearErr">X</span></p>
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

.error {
  color: #ef5350;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.error-close-btn {
  cursor: pointer;
  color: #ef5350;
  font-weight: bold;
  margin-left: 5px;
}

.error-close-btn:hover {
  color: #d32f2f;
}

.error-close-btn:active {
  color: #b71c1c;
}
</style>
