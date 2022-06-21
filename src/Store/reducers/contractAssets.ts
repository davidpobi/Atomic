const contractAssets = (state:any, action:any) => {
    switch(action.type) {
         case 'GET_COLLECTION':
              return action.payload;
         case 'CLEAR_COLLECTION':
                return [];
         default:
              return [];
    }
}

export default contractAssets;