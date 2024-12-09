<script setup>
import { AppState } from '@/AppState';
import { adsService } from '@/services/AdsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';




const ads = computed(() => AppState.ads)

// onMounted(() => {
//   getAds()
// })

// async function getAds() {
//   try {
//     await adsService.getAds()
//   }
//   catch (error) {
//     Pop.error(error);
//     logger.log('getting ads', error)
//   }
// }
</script>

<template>
  <div class="container-fluid">
    <section class="row">
      <div class="d-flex ad-img img-fluid">
        <div>
          <div v-for="ad in ads" :key="ad.id" class="m-4">
            <img :src="ad.tall" alt="">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.ad-img {
  height: 10em;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
}
</style>