<script setup>
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { ref } from 'vue';



const postData = ref({
  body: '',
  postImg: ''
})

function resetForm() {
  postData.value = {
    body: '',
    postImg: ''
  }
}

async function createPost() {
  try {
    console.log(postData.value);
    await postsService.createPost(postData.value)
  }
  catch (error) {
    Pop.error(error);
    logger.log('Creating post', error)

  }
}
</script>


<template>
  <form @submit.prevent="createPost()" class="row d-flex justify-content-center my-3">
    <div class="card shadow col-md-8 p-3">
      <h1 class="text-info p-2">Create a Post</h1>
      <div class="col-md-12 pb-3">
        <label for="post-body">Body</label>
        <input v-model="postData.body" type="text" maxlength="5000" name="post-body" id="post-body" required
          class="form-control">
      </div>
      <div class="col-md-12 pb-3">
        <label for="post-img">Img</label>
        <input v-model="postData.postImg" type="text" maxlength="500" name="post-img" id="post-img"
          class="form-control">
      </div>
      <div class="text-end">
        <button @click="resetForm()" class="btn btn-info m-2"><i class="mdi mdi-restore text-light"
            title="Reset Form"></i></button>
        <button class="btn btn-info m-2"><i class="mdi mdi-plus text-light" title="Add a Post"></i></button>
      </div>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>