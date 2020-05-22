export const getters = {
    authenticated(state) {
      //return state.auth.loggedIn
      return state.auth.loggedIn
    },

    user(state) {
      //return state.auth.user
      return state.auth.user
    }
  }