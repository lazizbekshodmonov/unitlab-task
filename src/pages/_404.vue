<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="h-screen flex-center flex-col">
    <h1 class="font-bold text-2xl">
      {{ $t('error_page.page_not_found') }}
    </h1>
    <a-button @click="goHome" type="primary" size="large">
      {{ $t('error_page.go_home') }}
    </a-button>
  </div>
</template>

<style scoped></style>
