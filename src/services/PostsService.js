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
    // AppState.currentPage = response.data.page
    // AppState.totalPages = response.data.totalPages
  }
  
  async changePage(pageNumber){
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('got page change', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
  
  async getPostsByProfileId(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('got posts by profile id', response.data);
    AppState.profilePosts = response.data.posts.map(postData => new Post (postData))
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
    const response = await api.get(`api/post?query=${searchTerm}`)
    logger.log('searched post', response.data)
}

  async deletePost(postId) {
    const response = await api.delete(`api/post/${postId}`)
    logger.log('deleted post', response.data);
    const indexToRemove = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(indexToRemove,1)
}
}

export const postsService = new PostsService()