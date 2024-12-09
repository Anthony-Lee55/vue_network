<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const route = useRoute()

watch(route, () => {
  changePage()
})
// async function getPage(pageNumber) {
//     try {
//       await postsService.changeHomePage(pageNumber)
//     }
//     catch (error) {
//       Pop.error('Changing page', error);
//       logger.log('getting next page', error)
//     }

//   }

async function changePage(pageNumber) {
  try {
    if (route.name == 'Home') {
      await postsService.changeHomePage(pageNumber)
    }
    else {
      const profileId = route.params.profileId
      await postsService.changeProfilePage(pageNumber, profileId)
    }
  }
  catch (error) {
    Pop.error(error);
    logger.log('getting different page', error)
  }
}

// async function changeProfilePage(pageNumber, profileId) {
//   try {
//     await postsService.changeProfilePage(pageNumber, profileId)
//   }
//   catch (error) {
//     Pop.error('Changing profile page', error);
//   }
// }

</script>


<template>
  <div class="d-flex justify-content-around ">
    <button :disabled="currentPage == 1" @click="changePage(currentPage - 1)" class="btn"><i
        class="mdi mdi-arrow-left"></i>
      Newer</button>
    <div class="d-flex align-items-center">
      {{ currentPage }} of {{ totalPages }}
    </div>
    <button :disabled="currentPage == totalPages" @click="changePage(currentPage + 1)" class="btn">Older <i
        class="mdi mdi-arrow-right"></i></button>
  </div>
</template>


<style lang="scss" scoped></style>