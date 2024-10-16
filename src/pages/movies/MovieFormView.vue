<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import IconTrash from '@/components/icons/IconTrash.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useStore()

const formRef = ref()
const form = reactive({
  name: null,
  description: null,
  image: null,
  year: null,
  genre: null,
  country: null
})

const requiredFieldRule = reactive({
  required: true,
  message: t('movie_details_page.required_field'),
  trigger: 'blur'
})

function uploadImage(file) {
  if (file && file.type.startsWith('image/')) {
    form.image = URL.createObjectURL(file)
  } else {
    form.image = null
  }
  return false
}

function sendForm() {
  formRef.value.validate().then(() => {
    if (route.params.id) {
      store.dispatch('updateMovie', { id: +route.params.id, movie: form })
    } else {
      store.dispatch('addMovie', form)
    }
    router.back()
  })
}

onMounted(() => {
  if (route.params.id) {
    store.dispatch('getOneMovieDetails', +route.params.id).then((movie) => {
      form.name = movie.name
      form.description = movie.description
      form.year = movie.year
      form.genre = movie.genre
      form.country = movie.country
      form.image = movie.image
    })
  }
})
</script>

<template>
  <div>
    <a-form :model="form" ref="formRef" layout="vertical">
      <a-row :gutter="16">
        <a-col :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item
            name="name"
            :label="$t('movie_details_page.name')"
            :rules="[requiredFieldRule]"
          >
            <a-input
              size="large"
              :placeholder="$t('movie_details_page.enter_name')"
              v-model:value="form.name"
            />
          </a-form-item>
        </a-col>
        <a-col :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item
            name="country"
            :label="$t('movie_details_page.country')"
            :rules="[requiredFieldRule]"
          >
            <a-input
              size="large"
              :placeholder="$t('movie_details_page.enter_country')"
              v-model:value="form.country"
            />
          </a-form-item>
        </a-col>
        <a-col :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item
            name="genre"
            :label="$t('movie_details_page.genre')"
            :rules="[requiredFieldRule]"
          >
            <a-input
              size="large"
              :placeholder="$t('movie_details_page.enter_genre')"
              v-model:value="form.genre"
            />
          </a-form-item>
        </a-col>
        <a-col :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item
            name="year"
            :label="$t('movie_details_page.year')"
            :rules="[requiredFieldRule]"
          >
            <a-input
              size="large"
              :placeholder="$t('movie_details_page.enter_year')"
              v-model:value="form.year"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            name="description"
            :label="$t('movie_details_page.description')"
            :rules="[requiredFieldRule]"
          >
            <a-textarea
              size="large"
              :auto-size="{ minRows: 4, maxRows: 7 }"
              :placeholder="$t('movie_details_page.enter_description')"
              v-model:value="form.description"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            name="image"
            :label="$t('movie_details_page.image')"
            :rules="[requiredFieldRule]"
          >
            <a-upload-dragger
              v-if="!form.image"
              :fileList="null"
              name="file"
              :before-upload="uploadImage"
            >
              {{ $t('movie_details_page.click_to_upload_image') }}
            </a-upload-dragger>
            <div
              v-else
              class="relative overflow-hidden flex justify-center max-h-[300px] border-[1px] rounded-xl bg-white p-2"
            >
              <img class="max-h-[300px]" :src="form.image" alt="" />
              <div
                class="absolute top-0 left-0 w-full h-full flex items-start justify-end p-4 opacity-0 hover:opacity-100 hover:bg-gray-600 hover:bg-opacity-15 transition"
              >
                <a-button
                  class="flex justify-center items-center"
                  size="large"
                  danger
                  type="primary"
                  @click="form.image = null"
                >
                  <template #icon>
                    <icon-trash class="text-2xl" />
                  </template>
                </a-button>
              </div>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="flex justify-end items-center gap-2">
          <a-button @click="router.back()" size="large">
            {{ $t('movie_details_page.back') }}
          </a-button>
          <a-button @click="sendForm" size="large" type="primary">
            {{ $t('movie_details_page.save') }}
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style scoped lang="scss"></style>
