import { Link, useLocation } from 'react-router-dom';
import TextInput from '../Components/TextInput';
import { useState } from 'react';
import axios from 'axios'

const LoanRequest = ()=>{
    const BASE_URL= 'http://localhost:4000';

    const location = useLocation();
    const ID = location.state.customer_id

    const [message, setMessage] = useState('');
    const [principal,setprincipal] = useState('')
    const [errorprincipal, setErrorprincipal] = useState(false)
    const [errorprincipalMessage, setErrorprincipalMessage] = useState('')
    const [interest, setinterest] = useState('')
    
    const onValueChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        console.log('name, value :>> ', name, value);
        setprincipal(value)
        setErrorprincipal(false)
        var reg = new RegExp('^[0-9]+$');
        let onlyNumbers = reg.exec(value)
        console.log('onlyNumbers :>> ', onlyNumbers);
        if (value.length !== 0 && onlyNumbers ) {
            let amount = parseFloat(value)
            console.log('amount :>> ', amount);
            if (amount !== NaN) { 
                let interestValue = amount * 1 * 0.05 * 0.01
                console.log('interest :>> ', interestValue);
                setinterest(interestValue.toFixed(2))
            } else {
                setinterest('0')
                setErrorprincipal(false)
                setErrorprincipalMessage('Enter valid amount')
            }
        } else {
            setinterest('0')
            setErrorprincipal(false)
            setErrorprincipalMessage('Enter valid amount')
        }

        
    }

    const OnSubmit = ()=>{
        window.sessionStorage.clear();
        console.log('principal,interest :>> ', principal,interest);
        setErrorprincipal(principal.length === 0? true:false)
        setErrorprincipalMessage(principal.length === 0 && 'This is a required question')
        
        
        if( principal.length !== 0 && interest.length !== 0 ){
            console.log('post now :>> ');
            let body = {
                customer_id:ID, principal,interest
            }
            console.log('body :>> ', body);
            axios.post(`${BASE_URL}/loan/request`, body)
            .then((response)=>{
                console.log('response :>> ', response);
                let custom = response.data
                console.log('custom :>> ', custom);
                if(response.data.status){
                    setMessage('Loan request Successfully')
                    setTimeout(()=>{
                        setMessage('')
                        setprincipal('')
                    },4000)
                }
            }).catch((error) => {
                setMessage('Loan request Failed')
                setTimeout(()=>{
                    setMessage('')
                },2000)
                console.log('error :>> ', error);
            })
        }
    }

    return(
        <>
            {message!==''? <p className="p-3 bg-green-100 text-center  lg:w-2/4 mx-auto w-11/12 text-gray-700 shadow mt-2 rounded">{message}</p> : null}
            <div className="border border-red-100 my-6 py-4 lg:w-1/4 mx-auto w-11/12 text-gray-700 shadow-lg rounded-3xl">
                
                <p className="text-3xl font-bold text-center ">Loan <span className='text-red-600'>Request</span></p>
                <p className='text-center mx-2'>Don't have an account? <Link className='text-red-600 hover:underline' to={`${process.env.PUBLIC_URL}/register`}>Register now</Link></p>

                <div className='px-4 my-4 space-y-3'>
                <TextInput 
                    title={'Amount'} 
                    label={'Enter Amount'} 
                    inputname={'principal'} 
                    inputtype={'principal'} 
                    errorState={errorprincipal}
                    errorMessage={errorprincipalMessage}
                    onValueChange={onValueChange}/>

                    <div>
                        Interest calculated: GHS {interest}
                    </div>
                  
                    <div className='text-center'>
                        <button onClick={OnSubmit} className='bg-gray-700 text-white rounded px-4 py-1 font-bold m-auto'>Request Loan</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LoanRequest