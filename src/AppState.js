import { reactive } from 'vue'
import { Post } from './models/Post.js'
import { Ad } from './models/Ad.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {Post[]} */
  posts: [],
  /** @type {Ad[]} */
  ads: [],
  /** @type {import('./models/Profile.js').Profile} user info from the database*/
  activeProfile: null,
  /** @type {Post[]} */
  profilePosts: [],

  currentPage: 1,
  totalPages: 44,
  likes: []
})

