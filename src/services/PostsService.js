import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Post } from "@/models/Post.js"
// import { applyStyles } from "@popperjs/core/index.js"

class PostsService{

  async getAllPosts(){
    const response = await api.get('api/posts')
    logger.log('got all posts', response)
    AppState.posts = response.data.posts.map(postData => new Post(postData))
    // AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }


  
  async changeHomePage(pageNumber){
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('got page change', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async changeProfilePage(pageNumber, profileId){
    const response =  await api.get(`api/posts?page=${pageNumber}&creatorId=${profileId}`)
    logger.log('got profile page change', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    // AppState.profilePosts = profilePosts
    AppState.profilePosts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
  
  async getPostsByProfileId(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('got posts by profile id', response.data);
    AppState.profilePosts = response.data.posts.map(postData => new Post (postData))
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
}
  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('created post',response.data);
    const createdPost = new Post(response.data)
    AppState.profilePosts.unshift(createdPost)
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
}


  async searchPosts(searchTerm) {
    const response = await api.get(`api/posts?query=${searchTerm}`)
    logger.log('searched post', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
}

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}/like`)
    logger.log('deleted post', response.data);
    const indexToRemove = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(indexToRemove,1)
}

async likePost(likeIds) {
  const response = await api.post(`api/posts/${likeIds}/like`)
  logger.log('liked post', response.data);
  const indexToLike = AppState.posts.findIndex(post => post.id == likeIds)
  AppState.posts.push(indexToLike,1)
}
}
export const postsService = new PostsService()