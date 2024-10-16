<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { debounce } from '@/helpers/index.js'

const router = useRouter()
const store = useStore()

const movies = ref([])
const open = ref(false)
const searchValue = ref('')

function handleSearchMovies(event) {
  debounce(
    'searchMovies',
    () => {
      store.dispatch('searchMovies', event.target.value).then((data) => {
        movies.value = data
        open.value = movies.value.length > 0 && event.target.value !== ''
      })
    },
    500
  )
}

function navigateMovieList(id) {
  router.push({ name: 'MovieDetailsView', params: { id } })
  open.value = false
  searchValue.value = ''
  movies.value = []
}
</script>

<template>
  <div class="w-full flex justify-center items-center h-[64px] bg-white">
    <div class="container relative flex justify-between items-center gap-2">
      <div>
        <router-link :to="{ name: 'MovieListView' }" class="navbar-item-btn">
          {{ $t('menu.MovieListView') }}
        </router-link>
        <router-link :to="{ name: 'AppFavoritesView' }" class="navbar-item-btn">
          {{ $t('menu.AppFavoritesView') }}
        </router-link>
      </div>
      <div class="w-1/3">
        <a-dropdown trigger="click" :open="open">
          <a-input-search
            v-model:value="searchValue"
            @change="handleSearchMovies"
            size="large"
          />
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="item in movies"
                :key="item?.id"
                @click="navigateMovieList(item?.id)"
              >
                <div class="flex flex-col">
                  <span class="font-semibold text-base">
                    {{ item?.name }}
                  </span>
                  <span class="font-medium text-muted">
                    {{ item?.genre }}
                  </span>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <a-button
        @click="router.push({ name: 'MovieCreateFormView' })"
        size="large"
        type="primary"
      >
        +
        {{ $t('movie_details_page.add') }}
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar-item-btn {
  min-width: 50px;
  padding: 12px 16px;
  border-radius: 8px;
  color: black;
}
</style>
