import axios from 'axios'

export const startAddProfilePicture=(data,token)=>{
    return (dispatch)=>{
        axios.put('http://localhost:3050/api/user/pic',data,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                console.log('user pic location',res.data)
                dispatch(addPicture(res.data))
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

const addPicture=(pic)=>{
    return {
        type:'ADD_PROFILE_PICTURE',
        payload:pic
    }
}

export const startGetPicture=(token)=>{
    return(dispatch)=>{
        axios.get('http://localhost:3050/api/user/info',{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                const user=res.data
                console.log('user info',user)
                dispatch(getPicture(user))
            })
    }
}

const getPicture=(pic)=>{
    return {
        type:'GET_PROFILE_PICTURE',
        payload:pic
    }
}


export const startAddName=(data,token)=>{
    return (dispatch)=>{
        axios.put('http://localhost:3050/api/user/name',data,{
            headers:{
                Authorization:token.token
            }
        })
            .then((res)=>{
                console.log('user name after insertion',res.data)
                dispatch(addName(res.data))
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

const addName=(name)=>{
    return {
        type:'ADD_PROFILE_NAME',
        payload:name
    }
}

export const clearUserInfo=()=>{
    return {
        type:'CLEAR'
    }
}