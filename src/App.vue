<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import { computed, onMounted } from 'vue';
import AdSideBar from './components/AdSideBar.vue';
import { adsService } from './services/AdsService';
import Pop from './utils/Pop';
import { logger } from './utils/Logger';

const ads = computed(() => AppState.ads)

onMounted(() => {
  getAds()
})

async function getAds() {
  try {
    await adsService.getAds()
  }
  catch (error) {
    Pop.error(error);
    logger.log('getting ads', error)
  }
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="d-flex">
    <router-view />
    <div>
      <AdSideBar />
    </div>
  </main>
  <footer>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
