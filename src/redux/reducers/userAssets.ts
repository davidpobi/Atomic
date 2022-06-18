const userAssets = (state:any, action:any) => {
    switch(action.type) {
         case 'GET':
              return action.payload;
         case 'CLEAR':
                return [];
         default:
              return [];
    }
}

export default userAssets;