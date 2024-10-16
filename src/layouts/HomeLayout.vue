<script setup>

import NavbarComponent from "@/components/NavbarComponent.vue";
</script>

<template>
  <div class="app">
    <navbar-component/>
    <div class="container pt-4">
      <router-view/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variable";

.app {
  //width: 100vw;
  min-height: 100vh;
  background-color: rgb($muted, 0.1);
}
</style>