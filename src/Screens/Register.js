import { useState } from "react"
import { Link} from "react-router-dom"
import TextInput from "../Components/TextInput"
import axios from 'axios'


const Register = ()=>{
    const BASE_URL= 'http://localhost:4000';

    const [message, setMessage] = useState('');
    const [phone,setphone] = useState('')
    const [name, setName] = useState('')
    const [fullname, setFullname] = useState('')
    const [marital, setMarital] = useState('')
    const [employment, setEmployment] = useState('')
    const [employer, setEmployer] = useState('')
    const [dob, setDob] = useState('')
    const [idcard, setIdcard] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

        // FOR ERROR STATE
    const [errorphone, setErrorphone] = useState(false)
    const [errorfullname, setErrorFullname] = useState('')
    const [errormarital, setErrorMarital] = useState('')
    const [erroremployment, setErrorEmployment] = useState('')
    const [erroremployer, setErrorEmployer] = useState('')
    const [errordob, setErrorDob] = useState('')
    const [erroridcard, setErrorIdcard] = useState('')
    const [erroraddress, setErrorAddress] = useState('')
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorCPassword, setErrorCPassword] = useState(false)
    
    // FOR ERROR MESSAGES
    const [errorphoneMessage, setErrorphoneMessage] = useState('') 
    const [errorfullnameMessage, setErrorFullnameMessage] = useState('')
    const [errormaritalMessage, setErrorMaritalMessage] = useState('')
    const [erroremploymentMessage, setErrorEmploymentMessage] = useState('')
    const [erroremployerMessage, setErrorEmployerMessage] = useState('')
    const [errordobMessage, setErrorDobMessage] = useState('')
    const [erroridcardMessage, setErrorIdcardMessage] = useState('')
    const [erroraddressMessage, setErrorAddressMessage] = useState('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('')
    const [errorCPasswordMessage, setErrorCPasswordMessage] = useState('')



    const OnSubmit = ()=>{
        console.log('phone,password,cpassword :>> ', phone,password,cpassword);
        setErrorphone(phone.length === 0? true:false)
        setErrorphoneMessage(phone.length === 0 && 'This is a required question') 
        setErrorPassword(password.length === 0? true:false)
        setErrorPasswordMessage(password.length === 0 && 'This is a required question')
        setErrorCPassword(cpassword.length === 0? true:false)
        setErrorCPasswordMessage(cpassword.length === 0 && 'This is a required question')
        setErrorMaritalMessage(marital.length === 0? true:false)
        setErrorMarital(marital.length === 0 && 'This is a required question')
        setErrorFullnameMessage(fullname.length === 0? true:false)
        setErrorFullname(fullname.length === 0 && 'This is a required question')
        setErrorEmploymentMessage(employment.length === 0? true:false)
        setErrorEmployment(employment.length === 0 && 'This is a required question')
        setErrorEmployerMessage(employer.length === 0 ? true : false)
        setErrorEmployer(employer.length === 0 && 'This is a required question')
        setErrorDobMessage(dob.length === 0 ? true : false)
        setErrorDob(dob.length === 0 && 'This is a required question')
        setErrorIdcardMessage(idcard.length === 0 ? true : false)
        setErrorIdcard(idcard.length === 0 && 'This is a required question')
        setErrorAddressMessage(address.length === 0 ? true : false)
        setErrorAddress(address.length === 0 && 'This is a required question')
        
        console.log(errorphone ,errorPassword ,errorCPassword)
        if(password.length < 6){
            setErrorPassword(true)
            setErrorPasswordMessage('Passwords must be 6 or more characters')
            return
        }
        if(password !== cpassword){
            setErrorCPassword(true)
            setErrorCPasswordMessage('Passwords must be the same')
            return
        }
        else if( phone.length !== 0 !== 0 && password.length !== 0 && cpassword.length !== 0 ){
            console.log('post now :>> ');
            let body = {
                fullname,marital,employer,employment,dob,idcard,address,phone,password
            }
            axios.post(`${BASE_URL}/register`, body,
            {headers: { 
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
            }})
            .then((response)=>{
                console.log('response :>> ', response);
                if(response.data.status){
                    setMessage('Account created Successfully (Proceed to Login)')
                    // setTimeout(()=>{
                    //     setMessage('')
                    //     navigator(`${process.env.PUBLIC_URL}/login`)
                    // },50000)
                }
            }).catch((error)=>{
                console.log('13error :>> mjhkj ', error.response.data.message);
                setMessage(`FAILED: ${error.response.data.message}`)
            })

            
        }
    }

    const onValueChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        console.log('name, value :>> ', name, value);
        switch (name) {
            case 'fullname':
                setFullname(value)
                setErrorFullname(false)
                break; 
            case 'marital':
                setMarital(value)
                setErrorMarital(false)
            break; 
            case 'employment':
                setEmployment(value)
                setErrorEmployment(false)
            break; 
            case 'employer':
                setEmployer(value)
                setErrorEmployer(false)
            break; 
            case 'dob':
                setDob(value)
                setErrorDob(false)
            break; 
            case 'idcard':
                setIdcard(value)
                setErrorIdcard(false)
            break; 
            case 'address':
                setAddress(value)
                setErrorAddress(false)
                break; 
            case 'phone':
                setphone(value)
                setErrorphone(false)
                break; 
            case 'password':
                setPassword(value)
                setErrorPassword(false)
                break;
            case 'cpassword':
                setCPassword(value)
                setErrorCPassword(false)
                break;
            default:
                break;
        }
    }
    return(
        <>
            {message!==''? <p className="p-3 bg-green-100 text-center  lg:w-2/4 mx-auto w-11/12 text-gray-700 shadow mt-2 rounded">{message}</p> : null}
            <div className="border border-red-100 my-6 py-4 lg:w-4/12 mx-auto w-11/12 text-gray-700 shadow-lg rounded-3xl">
               
                <p className="text-3xl font-bold text-center ">Sign <span className='text-red-600'>Up</span></p>
                <p className='text-center mx-2'>Already have an account? <Link className='text-red-600 hover:underline'  to={`${process.env.PUBLIC_URL}/login`} >Sign In</Link></p>

                <div className='px-4 my-4 space-y-3'>
                <TextInput 
                    title={'Fullname'} 
                    label={'Enter Fullname'} 
                    inputname={'fullname'} 
                    inputtype={'text'} 
                    errorState={errorfullname}
                    errorMessage={errorfullnameMessage}
                    onValueChange={onValueChange}/>
 
 <TextInput 
                    title={'Marital Status'} 
                    label={'Enter Marital status'} 
                    inputname={'marital'} 
                    inputtype={'text'} 
                    errorState={errormarital}
                    errorMessage={errormaritalMessage}
                    onValueChange={onValueChange}/>
 
 <TextInput 
                    title={'Employment Status'} 
                    label={'Enter employment status'} 
                    inputname={'employment'} 
                    inputtype={'text'} 
                    errorState={erroremployment}
                    errorMessage={erroremploymentMessage}
                    onValueChange={onValueChange}/>
 
 <TextInput 
                    title={'Employer Fullname'} 
                    label={'Enter Employer fullname'} 
                    inputname={'employer'} 
                    inputtype={'text'} 
                    errorState={erroremployer}
                    errorMessage={erroremployerMessage}
                    onValueChange={onValueChange}/>
 
 <TextInput 
                    title={'Date of birth'} 
                    label={'Enter Date of birth'} 
                    inputname={'dob'} 
                    inputtype={'date'} 
                    errorState={errordob}
                    errorMessage={errordobMessage}
                    onValueChange={onValueChange}/>
 
 <TextInput 
                    title={'ID card type'} 
                    label={'Enter ID card type'} 
                    inputname={'idcard'} 
                    inputtype={'text'} 
                    errorState={erroridcard}
                    errorMessage={erroridcardMessage}
                    onValueChange={onValueChange}/>
 
 <TextInput 
                    title={'Address'} 
                    label={'Enter your address'} 
                    inputname={'address'} 
                    inputtype={'text'} 
                    errorState={erroraddress}
                    errorMessage={erroraddressMessage}
                    onValueChange={onValueChange}/>
 
 
                    <TextInput 
                    title={'Phone number'} 
                    label={'Enter phone number'} 
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

                    <TextInput 
                    title={'Confirm Password'} 
                    label={'Enter password'} 
                    inputname={'cpassword'} 
                    inputtype={'password'}
                    errorState={errorCPassword}
                    errorMessage={errorCPasswordMessage}
                    onValueChange={onValueChange}/>
                    

                    <div className='text-center'>
                        <button onClick={OnSubmit} className='bg-gray-700 text-white rounded px-4 py-1 font-bold m-auto'>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register