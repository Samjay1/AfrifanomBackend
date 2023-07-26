const TextInput = ({title, label, inputname, inputtype,errorState,errorMessage, onValueChange})=>{
    
    return(
        <>
            <div>
                <p>{title}</p>
                <input onChange={onValueChange} className={errorState?"border border-slate-300 w-full rounded py-2 pl-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-orange-500 focus:ring-1 sm:text-sm border border-red-500"
                :"border border-slate-300 w-full rounded py-2 pl-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-orange-500 focus:ring-1 sm:text-sm"} type={inputtype}  id={inputname}  name={inputname} placeholder={label} required />
            </div>
            {errorState &&
             <div className="border bg-white pl-4 border-red-500 rounded p-1 mt-0 flex text-red-500"> <span className="icon  mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <span className="text-red-500 text-xs font-bold">{errorMessage}</span>
            </div>
           }
        </>
    )
}

export default TextInput;