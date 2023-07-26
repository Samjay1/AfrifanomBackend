import { Link ,useNavigate } from 'react-router-dom';
import TextInput from '../Components/TextInput';
import { useState } from 'react';
import axios from 'axios'

const Login = ()=>{
    const BASE_URL= 'http://localhost:4000';

    // window.sessionStorage.clear();
    const navigator = useNavigate();

    const [message, setMessage] = useState('');
    const [phone,setphone] = useState('')
    const [errorphone, setErrorphone] = useState(false)
    const [errorphoneMessage, setErrorphoneMessage] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('')

    const onValueChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        console.log('name, value :>> ', name, value);
        switch(name){
            case 'phone':
                setphone(value)
                setErrorphone(false)
                break;
            case 'password':
                setPassword(value)
                setErrorPassword(false)
                break;
            default:
                break;
        }
    }

    const OnSubmit = ()=>{
        window.sessionStorage.clear();
        console.log('phone,password :>> ', phone,password);
        setErrorphone(phone.length === 0? true:false)
        setErrorphoneMessage(phone.length === 0 && 'This is a required question')
        setErrorPassword(password.length === 0? true:false)
        setErrorPasswordMessage(password.length === 0 && 'This is a required question')
        
        console.log(errorphone ,errorPassword)
        
        if( phone.length !== 0 && password.length !== 0 ){
            console.log('post now :>> ');
            let body = {
                phone,password
            }
            axios.post(`${BASE_URL}/login`, body)
            .then((response)=>{
                console.log('response :>> ', response);
                if(response.data.status){
                    setMessage('Login Successfully')
                    let customer_id = response.data.response.id
                    
                    console.log('login customer_id :>> ', customer_id);
                    window.sessionStorage.setItem('customer_id', customer_id)
                    setTimeout(()=>{
                        setMessage('')
                        navigator(`${process.env.PUBLIC_URL}/request`,{state:{customer_id}})
                    },1000)
                }
            }).catch((error) => {
                
                setMessage('Login Failed')
                setTimeout(()=>{
                    setMessage('')
                    navigator(`${process.env.PUBLIC_URL}/login`)
                },2000)
                console.log('error :>> ', error);
            })
        }
    }

    return(
        <>
            {message!==''? <p className="p-3 bg-green-100 text-center  lg:w-2/4 mx-auto w-11/12 text-gray-700 shadow mt-2 rounded">{message}</p> : null}
            <div className="border border-red-100 my-6 py-4 lg:w-1/4 mx-auto w-11/12 text-gray-700 shadow-lg rounded-3xl">
                
                <p className="text-3xl font-bold text-center ">Sign <span className='text-red-600'>In</span></p>
                <p className='text-center mx-2'>Create a new account? <Link className='text-red-600 hover:underline' to={`${process.env.PUBLIC_URL}/register`}>Sign Up</Link></p>

                <div className='px-4 my-4 space-y-3'>
                <TextInput 
                    title={'phone'} 
                    label={'Enter phone address'} 
                    inputname={'phone'} 
                    inputtype={'phone'} 
                    errorState={errorphone}
                    errorMessage={errorphoneMessage}
                    onValueChange={onValueChange}/>

                    <TextInput 
                    title={'Password'} 
                    label={'Enter password'} 
                    inputname={'password'} 
                    inputtype={'password'}
                    errorState={errorPassword}
                    errorMessage={errorPasswordMessage}
                    onValueChange={onValueChange}/>
                  
                    <div className='text-center'>
                        <button onClick={OnSubmit} className='bg-gray-700 text-white rounded px-4 py-1 font-bold m-auto'>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login