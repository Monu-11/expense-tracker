import React,{useState} from 'react'
import '../App.css';
import AddExpense from './AddExpense';

import ExpenseTable from './ExpenseTable';
import SearchBar from './SearchBar';
import TestComp from './TestComp';

const Home=(props)=>{
    
    const [searchText,setSearchText]=useState('')
    console.log('search text',searchText)
    console.log('inside Home ')

    const updateSearchText=(text)=>{
        setSearchText(text)
    }
    return (
        <div >
           <center><h1>Home Page</h1></center> <br />
            <BudgetOverview /> <br /><br />
            
                <div className='expenseParent'>
                    <div className='expenseDiv'>
                        <AddExpense /> <br />
                    </div>
                    <div className='searchDiv'>
                        <SearchBar updateSearchText={updateSearchText} />
                    </div>
                </div>
            
           <center><ExpenseTable searchText={searchText}/></center>     
            {/* <AddPagination expenses={expenses} categories={categories}/> */}
        </div>
    )
}

export default Home