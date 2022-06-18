export const getAssets = (data:any) => {
  return {
    type: "GET",
    payload: data
  }
}

export const clearAssets = (data:any) => {
    return {
      type: "CLEAR",
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
  