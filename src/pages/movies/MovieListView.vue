<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import MovieListItemCardView from '@/components/MovieListItemCardView.vue'

const store = useStore()
const movies = computed(() => store.state.movies)

onMounted(() => {
  store.dispatch('getAllMovies')
})
</script>

<template>
  <div class="w-full">
    <a-row :gutter="[8, 8]">
      <a-col
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
        v-for="item in movies"
        :key="item.id"
      >
        <movie-list-item-card-view :movie="item" />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss"></style>
