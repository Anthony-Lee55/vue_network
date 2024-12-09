import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Ad } from "@/models/Ad.js"


class AdsService{

  async getAds(){
    const response = await api.get('api/ads')
    logger.log('got ads', response.data)
    const ad = new Ad(response.data)
    AppState.ads = response.data.map(adData => new Ad(adData))
  }
}
export const adsService = new AdsService()