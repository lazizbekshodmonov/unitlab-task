<script setup>


import theme from '@/utils/ant/theme.js'


</script>

<template>
  <a-config-provider :theme="theme">
    <router-view/>
  </a-config-provider>
</template>

<style scoped></style>
