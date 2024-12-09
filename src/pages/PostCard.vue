<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';


const props = defineProps({ post: Post })

const user = computed(() => AppState.account)

// const post = defineProps({ post: Post })

async function deletePost() {
  try {
    const confirm = await Pop.confirm("Do you really want to delete this post?")
    if (!confirm) return
    await postsService.deletePost(props.post.id)
  }
  catch (error) {
    Pop.error(error);
    logger.log('deleting car', error)
  }
}
</script>


<template>
  <div class="d-flex card shadow rounded-0 m-3 justify-content-center">
    <RouterLink :to="{ name: 'Profile', params: { profileId: props.post.creatorId } }">
      <div class="d-flex align-items-center">
        <img class="profile-img m-4" :src="post.creator.picture" alt="">
        <h1 class="text-dark fw-bold">{{ post.creator.name }}</h1>
        <h1 v-if="post.creator.graduated" class="text-dark fs-1"><i class="mdi mdi-school"></i></h1>
      </div>
      <p class="text-dark">{{ post.createdAt }}</p>
    </RouterLink>
    <div>

    </div>
    <div class="p-4">
      <h3>
        {{ post.body }}
      </h3>
      <img class="post-img" :src="post.imgUrl" alt="">
    </div>
    <div class="pe-3 fs-2 d-flex justify-content-between p-2">
      <span>
        <i class="mdi mdi-heart-outline mdi-fill text-info"></i>
        {{ post.likes.length }}
      </span>
      <button @click="deletePost()" v-if="post.creatorId == user?.id" type="button" class="btn btn-info"><i
          class="mdi mdi-delete text-light"></i></button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.post-img {
  width: 100%;
  max-height: 60em;
  object-fit: cover;
  object-position: center;
}

.profile-img {
  border-radius: 50em;
  height: 75px;
  width: 75px;
}
</style>