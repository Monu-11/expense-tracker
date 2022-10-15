const initialState={}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_PROFILE_PICTURE':{
            return {...action.payload}
        }
        case 'GET_PROFILE_PICTURE':{
            return {...action.payload}
        }
        case 'ADD_PROFILE_NAME':{
            return {...action.payload}
        }
        case 'CLEAR':{
            return {}
        }
        default:{
            return state
        }
    }
}

export default userReducer