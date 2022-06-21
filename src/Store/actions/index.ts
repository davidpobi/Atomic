export const getAssets = (data:any) => {
  return {
    type: "GET_ASSETS",
    payload: data
  }
}

export const clearAssets = (data:any) => {
    return {
      type: "CLEAR_ASSETS",
      payload: data
    }
  }


  export const getCollection = (data:any) => {
    return {
      type: "GET_COLLECTION",
      payload: data
    }
  }

  
  export const clearCollection = (data:any) => {
      return {
        type: "CLEAR_COLLECTION",
        payload: data
      }
    }
  

export const isLoggedIn = () => {
    return {
      type: "LOGGED_IN"
    }
  }
  


export const isLoggedOut = () => {
    return {
      type: "LOGGED_OUT"
    }
  }
  