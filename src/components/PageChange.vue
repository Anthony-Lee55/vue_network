<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function getPage(pageNumber) {
  try {
    await postsService.changePage(pageNumber)
  }
  catch (error) {
    Pop.error('Changing page', error);
    logger.log('getting next page', error)
  }
}
</script>


<template>
  <div class="d-flex justify-content-around">
    <button :disabled="currentPage == 1" @click="getPage(currentPage - 1)" class="btn"><i class="mdi mdi-arrow-left"></i>
      Newer</button>
    <button :disabled="currentPage == totalPages" @click="getPage(currentPage + 1)" class="btn">Older <i
        class="mdi mdi-arrow-right"></i></button>
  </div>
</template>


<style lang="scss" scoped></style>