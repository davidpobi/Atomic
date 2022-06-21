const userAssets = (state:any, action:any) => {
    switch(action.type) {
         case 'GET_ASSETS':
              return action.payload;
         case 'CLEAR_ASSETS':
                return [];
         default:
              return [];
    }
}

export default userAssets;