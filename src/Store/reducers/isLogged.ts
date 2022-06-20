const loggedReducer = (state = false, action:any) => {
      switch(action.type) {
           case 'LOGGED_IN':
                return true;
           case 'LOGGED_OUT':
                return false;
           default:
                return state;
      }
}

export default loggedReducer;