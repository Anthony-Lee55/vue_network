<script setup>
import { AppState } from '@/AppState';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from './PostCard.vue';
import { postsService } from '@/services/PostsService';
import PostForm from '@/components/PostForm.vue';

const route = useRoute()

const profile = computed(() => AppState.activeProfile)

const posts = computed(() => AppState.profilePosts)

const account = computed(() => AppState.account)

onMounted(() => {
  getProfileById()
  getPostsByProfileId()
})

watch(route, () => {
  getProfileById()
  getPostsByProfileId()
})

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.log('getting profile by id', error)
  }
}

async function getPostsByProfileId() {
  try {
    const profileId = route.params.profileId
    await postsService.getPostsByProfileId(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.log('getting posts by profile id', error)
  }
}
</script>


<template>
  <div class="container-fluid">

    <section v-if="profile" class="row d-flex justify-content-center">
      <div class="col-md-8 d-flex card shadow rounded-0 m-4">
        <img class="creator-cover" :src="profile.coverImg" :alt="profile.picture">
        <span><img :src="profile.picture" :alt="profile.name" class="creator-img m-5">
          <i v-if="profile.graduated" class="fs-1 mdi mdi-school mdi-spin text-info"></i></span>
        <div class="fs-1 justify-content-end d-flex">
          <div>
            <a v-if="profile.github" :href="profile.github" target="_blank"><span class="pe-3"><i
                  class="text-info mdi mdi-github"></i></span></a>
          </div>
          <div>
            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><span class="pe-3"><i
                  class="text-info mdi mdi-linkedin"></i></span></a>
          </div>
          <div>
            <a v-if="profile.resume" :href="profile.resume" target="_blank"><span class="pe-3"><i
                  class="text-info mdi mdi-book-account"></i></span></a>
          </div>
        </div>
        <div>
          <p>{{ profile.class }}</p>
          <h1 class="fw-bold">{{ profile.name }}</h1>
          <p>{{ profile.bio }}</p>
          <span class="text-end p-2">
            <button class="d-flex btn btn-outline-info justify-content-end">Edit</button>
          </span>
        </div>
      </div>
    </section>
    <PostForm v-if="profile?.id == account?.id && account" />
    <!-- <button class="btn btn-dark fs-1 ms-5 text-success"><i class="mdi mdi-plus-circle-outline"></i></button> -->
    <section class="row d-flex justify-content-center">
      <div v-for="post in posts" :key="post.id" class="col-md-8 post-card ">
        <PostCard :post="post" />
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.creator-img {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  object-fit: cover;
}

.creator-cover {
  height: 250px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.post-card {
  height: 100%;
}
</style>