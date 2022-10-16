import React,{useState} from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { startAddProfilePicture,startAddName } from '../actions/userAction' 
import { useDispatch,useSelector } from 'react-redux'
import userPage from '../img/registerImage.avif'

const UserProfile=(props)=>{
    
    const token=JSON.parse(localStorage.getItem('jwtToken'))
    const userInfo=useSelector(state=>state.userInfo)
    console.log('profile pic in comp',userInfo)  
    const dispatch=useDispatch()
    const [image,setImage]=useState(userInfo.hasOwnProperty('picture')?userInfo.picture:null)
    const [name,setName]=useState(userInfo.hasOwnProperty('name')?userInfo.name:null)
    const [toggle,setToggle]=useState(false)
    console.log('name',name)
    const handleFileUpload=(e)=>{
        const type=e.target.name
        const val=e.target.value
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
    const handleChange=(e)=>{
        setName(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(startAddName({name:name},token))
    }
    const handleButtonClick=()=>{
        const data=new FormData()
        data.append('file',image)

        console.log('image data',data)
        dispatch(startAddProfilePicture(data,token)) 
        
  }

    return (
        <div>
            <center><h1>User Profile</h1><br /><br />
            <div style={{border:'solid 1px black', padding:'40px', borderRadius:'10px',backgroundImage:`url(${userPage})`,boxShadow:'7px 7px 7px 7px',backgroundSize:'cover'}}>
               {/* <div> {(name||image)&&<i className="bi bi-pencil-square" ></i>}</div> */}
                {userInfo.hasOwnProperty('picture')?<><img src={`http://localhost:3050/images/${userInfo.picture.slice(7)}`} /><br /><br /></>:
                    <div>
                        <form >
                    
                    <div className="mb-3">
                        
                    <input className="form-control" type="file" id="formFile" onChange={handleFileUpload} name='image' />
                </div>
                    <label>Please upload a profile picture</label><br />
                    
                    
                  </form>
                  <button className='btn btn-primary' onClick={handleButtonClick}>Send</button><br /><br />
                    </div>
                }
                {userInfo.hasOwnProperty('name')?<>
                         <h1>Hola,{userInfo.name}!</h1>
                         
                    </>:
                 <form onSubmit={handleSubmit}>
                 <input className='form-control'type='text' value={name} name='name' placeholder='Set a profile name' onChange={handleChange} /><br />
                 <input type='submit' className='btn btn-primary' value='OK'/>
             </form>}
               

             </div>
            </center>

        </div>
    )
}

export default UserProfile