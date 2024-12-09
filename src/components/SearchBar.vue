<script setup>
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { ref } from 'vue';


const searchTerm = ref('')

async function searchPosts() {
  try {
    await postsService.searchPosts(searchTerm.value)
  }
  catch (error) {
    Pop.error(error);
    logger.log('searching posts', error)
  }

}

</script>


<template>
  <section class="row">
    <form @submit.prevent="searchPosts()" class="input-group">
      <label for="search-bar"></label>
      <input v-model="searchTerm" id="search-bar" type="text" class="rounded-start-1 border border-none">
      <button class="btn btn-info text-light rounded-end-1"><i class="mdi mdi-magnify"></i></button>
    </form>
  </section>
</template>


<style lang="scss" scoped></style>