<script setup>
import { AppState } from '@/AppState';
import PageChange from '@/components/PageChange.vue';
import PostCard from '@/pages/PostCard.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

onMounted(() => {
  getAllPosts()
})

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.error(error);
    logger.log('getting all posts', error)
  }
}
</script>

<template>
  <div class="container-fluid">
    <section class="row d-flex justify-content-center mb-3">
      <div class="col-md-10">
        <div>
          <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
        </div>
      </div>
      <PageChange />
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
