// import {react} from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


const List = ()=>{
    const navigator = useNavigate()

    const BASE_URL= 'http://localhost:4000';

  
    const [response, setResponse] = useState(null);
    useEffect(()=>{
        axios.get(`${BASE_URL}/loan/all`)
        .then((response)=>{
            console.log('response :>> ', response.data.response);
            if(response.data.status){
                setResponse(response.data.response);
            }else{
                setResponse([])
            }
        })
    },[])
   
    const [search, setSearch] = useState('');
    let [searchList,setSearchList] = useState([])
    const OnSearching= (e)=>{
        let search_value = e.target.value.toLowerCase();
        // console.log('value :>> ', search_value);
        setSearch(search_value) 
        searchList = response.map((value,index)=>{
            let searchMatch = value.fullname?.toLowerCase().includes(search_value)
            let searchMatch2 = value.pricipal?.toLowerCase().includes(search_value)
            let searchMatch3 = value.status?.toLowerCase().includes(search_value)
            // console.log('value match',searchMatch)
            if(searchMatch || searchMatch2 || searchMatch3){
                return (
                    <div key={index} onClick={()=>{previewClick(value.id)}} className=' grid grid-cols-5 m-5 text-gray-600 rounded-3xl border-2 border-gray-400 hover:border-blue-500 hover:text-blue-600 overflow-hidden'>
                       
                       <div className='lg:col-span-3 col-span-5 p-1 text-base space-y-2 px-3'>
                            <p className='font-bold text-xl'>Name: {value.fullname.toUpperCase()}</p>
                            <p className='font-bold'>Employment Status: {value.employment}</p>
                            <p className='font-bold'>Date: {value.date}</p>
                            <p className='font-bold'>Phone Number: {value.phone}</p>
                            <p className='font-bold'>Address: {value.address}</p>
                            <p className='font-bold'>Principal: GHS {value.principal}</p>
                            <p className='font-bold'>Interest: GHS {value.interest}</p>
                            <p className='font-bold'>Status: {value.status}</p>
                        </div>
                    </div>
                )
            } else{
                return null;
            }
            
             
        })
        setSearchList(searchList)
    }


    const previewClick = (id)=>{
        // console.log('clicked',id)
        navigator(`${process.env.PUBLIC_URL}/preview`,{state:{id}})
    }

    let list = response?.map((value,index)=>{
        return (
            <div key={index} onClick={()=>{previewClick(value.id)}} className=' grid grid-cols-5 m-5 text-gray-600 rounded border border-gray-400 hover:border-blue-500 hover:text-blue-600 overflow-hidden'>
               
               <div className='lg:col-span-3 col-span-5 p-1 text-base space-y-2 px-3'>
                    <p className='font-bold text-xl'>Name: {value.fullname.toUpperCase()}</p>
                    <p className='font-bold'>Employment Status: {value.employment}</p>
                    <p className='font-bold'>Date: {value.date}</p>
                    <p className='font-bold'>Phone Number: {value.phone}</p>
                    <p className='font-bold'>Address: {value.address}</p>
                    <p className='font-bold'>Principal: GHS {value.principal}</p>
                    <p className='font-bold'>Interest: GHS {value.interest}</p>
                    <p className='font-bold'>Status: {value.status}</p>
                </div>
            </div>
        )
        
    })

    return(
        <>
            <div className="border border-red-100 my-6 py-4 lg:w-2/4 mx-auto w-11/12 text-gray-700 shadow-lg rounded-3xl">
                
                <p className="text-3xl font-bold text-center "> Company XYZ <span className='text-red-600'>Microfinance</span></p>
                <p className='text-center mx-2'>Search for loan list</p>

                <div className='my-5 md:w-1/2 w-11/12 mx-auto'> 
                    <input onChange={OnSearching} type={'text'} className=" border border-gray-400 rounded-3xl p-3 pl-5 focus:outline-none w-full focus:border-blue-300 text-input rounded-0 pb-2 px-2 hover:bg-blue-50"  placeholder="Type your response"/>
                </div>
                <div className='my-5'>
                   

                    {/* {searchList.length!==0? searchList: 'loading'} */}

                    {response===null?
                    <div className='font-bold text-3xl text-blue-900 lg:text-left lg:mt-0 mt-1'>
                        <p className='text-center'>Loading...</p>
                    </div>
                    : response.length===0?
                    <div className='font-bold text-3xl text-blue-900 lg:text-left lg:mt-0 mt-1'>
                        <p className='text-center'>Empty List</p>
                    </div>
                    : search.length!==0? 
                    searchList
                    :
                    list}

                     {/* SINGLE ITEM */}
                     {/* <div className=' grid grid-cols-5 m-5 text-gray-600 rounded-3xl border-2 border-gray-400 hover:border-blue-500 hover:text-blue-600 overflow-hidden'>
                        <div className='lg:col-span-2 col-span-5 bg-gray-200'>
                            <img className='object-contain h-full' src={process.env.PUBLIC_URL+"/logo.png"} alt="" />
                        </div>
                        <div className='lg:col-span-3 col-span-5 p-1 h-36 space-y-2'>
                            <p className='font-bold text-2xl text-blue-900 lg:text-left text-center lg:mt-0 mt-1'>Votella Awards</p>
                            <p className='text-xl font-bold'> Note that the  build is not optimized ooptimized ptimized</p>
                            <article className='truncate text-gray-500 text-md'>Description CControl the stack order of order it has been displayeControl the stack order (or three-dimensional positioning) of an element in Tailwind, regardless of order it has been displaye(or three-dimensional positioning) of an element in Tailwind, regardless of order it has been displaye</article>
                        </div>
                    </div> */}
                    {/* END SINGLE ITEM */}

                </div>
            </div>

        </>
    )

}

export default List;