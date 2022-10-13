import React,{useState} from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { startAddProfilePicture } from '../actions/userAction' 
import { useDispatch,useSelector } from 'react-redux'

const UserProfile=(props)=>{
    
    const token=JSON.parse(localStorage.getItem('jwtToken'))
    const profilePic=useSelector(state=>state.profilePic)
      
    const dispatch=useDispatch()
    const [image,setImage]=useState()
    const [name,setName]=useState('')
    const handleChange=(e)=>{
        const type=e.target.name
        const val=e.target.value
        console.log(e.target.files[0])
        type==='image'?setImage(e.target.files[0]):setName(val)
    }

    const handleButtonClick=()=>{
        const data=new FormData()
        data.append('file',image)

        console.log('image data',data)
        dispatch(startAddProfilePicture(data,token)) 
  }

    return (
        <div>
            <center><h1>User Profile</h1>
                {Object.keys(profilePic).length!=0?<img src='' />:
                    <div>
                        <form >
                    
                    <label>Please upload a profile picture</label><br />
                    <div className="mb-3">
                        
                        <input className="form-control" type="file" id="formFile" onChange={handleChange} name='image' />
                    </div>
                    
                  </form>
                  <button className='btn btn-primary' onClick={handleButtonClick}>Send</button>
                    </div>
                }
                
            </center>

        </div>
    )
}

export default UserProfile