import{defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions:{
    setUser(userData){
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    clearUser(){
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
