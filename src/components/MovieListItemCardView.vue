<script setup>
import IconHeart from '@/components/icons/IconHeart.vue'
import IconHeardSolid from '@/components/icons/IconHeardSolid.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const store = useStore()

const favorites = computed(() => store.state.favorites)
const isFavorite = computed(() => favorites.value.includes(props.movie?.id))

function toggleFavorites() {
  if (!isFavorite.value) {
    store.dispatch('addFavorites', props.movie.id)
  } else {
    store.dispatch('removeFromFavorites', props.movie.id)
  }
}

function deleteMovie() {
  store.dispatch('deleteMovie', props.movie.id)
}
</script>

<template>
  <a-card
    @click="router.push({ name: 'MovieDetailsView', params: { id: movie.id } })"
    hoverable
    class="h-full item-card"
  >
    <template #cover>
      <div class="h-[300px] flex items-center justify-center overflow-hidden">
        <img class="w-full" :src="movie?.image" alt="" />
      </div>
    </template>
    <a-card-meta :title="movie.name">
      <template #description>
        <p class="line-clamp-3">{{ movie.description }}</p>
      </template>
    </a-card-meta>
    <template #actions>
      <div class="w-full flex justify-end items-center gap-2 px-2">
        <a-button
          @click.stop="toggleFavorites"
          type="ghost"
          size="middle"
          shape="circle"
          class="text-2xl flex items-center justify-center"
        >
          <icon-heart v-if="!favorites.includes(movie.id)" />
          <icon-heard-solid v-else class="text-red" />
        </a-button>
        <a-button
          @click.stop="
            router.push({
              name: 'MovieEditFormView',
              params: {
                id: movie?.id
              }
            })
          "
          type="ghost"
          size="middle"
          danger
          shape="circle"
          class="text-2xl flex items-center justify-center"
        >
          <icon-edit class="text-yellow" />
        </a-button>
        <a-button
          @click.stop="deleteMovie"
          type="ghost"
          size="middle"
          danger
          shape="circle"
          class="text-2xl flex items-center justify-center"
        >
          <icon-trash class="text-red" />
        </a-button>
      </div>
    </template>
  </a-card>
</template>

<style scoped lang="scss">
.item-card {
  display: flex;
  flex-direction: column;

  &:deep(.ant-card-body) {
    flex-grow: 1;
  }
}
</style>
