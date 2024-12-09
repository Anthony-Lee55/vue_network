<script setup>
import { AppState } from '@/AppState';
import { accountService } from '@/services/AccountService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, ref, watch } from 'vue';

const account = computed(() => AppState.account)

const accountData = ref({
  name: '',
  coverImg: '',
  picture: '',
  bio: '',
  linkedin: '',
  github: '',
  resume: '',
  class: '',
  graduated: false,
})

watch(account, () => {
  console.log(account.value);
  accountData.value.name = account.value.name
  accountData.value.coverImg = account.value.coverImg
  accountData.value.picture = account.value.picture
  accountData.value.bio = account.value.bio
  accountData.value.linkedin = account.value.linkedin
  // @ts-ignore
  accountData.value.github = account.value.github
  accountData.value.resume = account.value.resume
  accountData.value.class = account.value.class
  accountData.value.graduated = account.value.graduated
}, { immediate: true })

async function saveAccount() {
  try {
    await accountService.saveAccount(accountData.value)
  }
  catch (error) {
    Pop.error('Did not save account', error);
    logger.log(error)
  }
}
</script>


<template>
  <div class="card shadow m-4 p-2 rounded-0">
    <form @submit.prevent="saveAccount()" class="row text-start">
      <div class="mb-3 col-4">
        <label for="account-name">Name</label>
        <input v-model="accountData.name" type="text" id="account-name" name="account-name" class="form-control"
          maxlength="100" required>
      </div>
      <div class="mb-3 col-4">
        <label for="account-coverImg">Cover Image</label>
        <input v-model="accountData.coverImg" type="text" id="account-coverImg" name="account-coverImg"
          class="form-control" maxlength="500">
      </div>
      <div class="mb-3 col-4">
        <label for="account-picture">Profile Picture</label>
        <input v-model="accountData.picture" type="text" id="account-picture" name="account-picture"
          class="form-control" maxlength="500">
      </div>
      <div class="mb-3 col-4">
        <label for="account-bio">Bio</label>
        <textarea v-model="accountData.bio" type="text" id="account-bio" name="account-bio" class="form-control"
          maxlength="1000"></textarea>
      </div>
      <div class="mb-3 col-4">
        <label for="account-linkedin">LinkedIn</label>
        <input v-model="accountData.linkedin" type="text" id="account-linkedin" name="account-linkedin"
          class="form-control" maxlength="500">
      </div>
      <div class="mb-3 col-4">
        <label for="account-github">Github</label>
        <input v-model="accountData.github" type="text" id="account-github" name="account-github" class="form-control"
          maxlength="500">
      </div>
      <div class="mb-3 col-4">
        <label for="account-resume">Resume</label>
        <input v-model="accountData.resume" type="text" id="account-resume" name="account-resume" class="form-control"
          maxlength="500">
      </div>
      <div class="mb-3 col-4">
        <label for="account-class">Class</label>
        <input v-model="accountData.class" type="text" id="account-class" name="account-class" class="form-control"
          maxlength="100">
      </div>
      <div class="mb-3 col-4">
        <label for="account-graduated" class="p-2">Graduated</label>
        <input v-model="accountData.graduated" type="checkbox" id="account-graduated" name="account-graduated"
          maxlength="100">
      </div>
      <div class="text-end p-4">
        <button class="btn btn-info text-light">Save Changes</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>