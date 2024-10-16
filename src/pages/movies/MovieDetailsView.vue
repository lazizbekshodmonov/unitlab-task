<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconHeardSolid from '@/components/icons/IconHeardSolid.vue'

const route = useRoute()
const store = useStore()

const movieDetails = computed(() => store.state.movieDetails)
const favorites = computed(() => store.state.favorites)
const isFavorite = computed(() =>
  favorites.value.includes(movieDetails.value?.id)
)

function toggleFavorites() {
  if (!isFavorite.value) {
    store.dispatch('addFavorites', movieDetails.value?.id)
  } else {
    store.dispatch('removeFromFavorites', movieDetails.value?.id)
  }
}

onMounted(() => {
  if (route.params.id) {
    store.dispatch('getOneMovieDetails', +route.params.id)
    document.title = movieDetails.value?.name
  }
})
</script>

<template>
  <a-spin :spinning="store.getters.isLoading('MovieDetails')">
    <div
      class="min-h-[calc(100vh-96px)] pb-4 flex justify-between items-start gap-4"
    >
      <div class="w-1/3">
        <img class="w-full" :src="movieDetails?.image" alt="" />
      </div>
      <div class="w-2/3 text-2xl font-bold">
        <div class="flex justify-between">
          <h1>{{ movieDetails?.name }}</h1>
          <a-button
            @click.stop="toggleFavorites"
            type="ghost"
            size="middle"
            shape="circle"
            class="text-2xl flex items-center justify-center"
          >
            <icon-heart v-if="!isFavorite" />
            <icon-heard-solid v-else class="text-red" />
          </a-button>
        </div>
        <div class="mb-4 text-base font-medium">
          <span> {{ $t('movie_details_page.year') }}: </span>
          <span class="text-muted">{{ movieDetails?.year }}</span>
        </div>
        <div class="mb-4 text-base font-medium">
          <span> {{ $t('movie_details_page.genre') }}: </span>
          <span class="text-muted">{{ movieDetails?.genre }}</span>
        </div>
        <div class="mb-4 text-base font-medium">
          <span> {{ $t('movie_details_page.country') }}: </span>
          <span class="text-muted">{{ movieDetails?.country }}</span>
        </div>
        <div class="mb-4 text-base font-medium">
          <span> {{ $t('movie_details_page.description') }}: </span>
          <span class="text-muted">{{ movieDetails?.description }}</span>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<style scoped lang="scss"></style>
