import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import ExpenseItem from './ExpenseItem'
import Pagination from './Pagination'
import 'bootstrap/dist/css/bootstrap.min.css';
import { setPageNum } from '../actions/pageAction';

const ExpenseTable=React.memo((props)=>{
    const dispatch=useDispatch()
    const {searchText}=props
    const storePageNum=useSelector(state=>state.pageNum)
    console.log('state page Num',storePageNum)
    const expenses=useSelector(state=>state.expenses)
    const deletedExpenses=useSelector(state=>state.deletedExpenses)
    const categories=useSelector(state=>state.categories)
    const allExpenses=[...expenses,...deletedExpenses].sort(function(a,b){
        return new Date(b.date)- new Date(a.date)
    })
    console.log('all expenses in Expense Table',allExpenses)
    console.log('all categoris in expense table comp',categories)

    const [currentPage,setCurrentPage]=useState(storePageNum.num)
    const findCategory=(id)=>{
        const res=categories.find(category=>category._id===id)
        return res.name
    }
    const [expensesPerPage,setExpensesPerPage]=useState(5)
    const indexOfLastExpense=currentPage*expensesPerPage
    const indexOfFirstExpense=indexOfLastExpense-expensesPerPage
    const currentExpenses=allExpenses.slice(indexOfFirstExpense,indexOfLastExpense)
    console.log('current expenses',currentExpenses)
    console.log('current page number',currentPage)
    
    const finalArr=(searchText.length>0?allExpenses:currentExpenses).filter((expense)=>{
        if(searchText===''){
            return expense
        }
        else if(expense.name.toLowerCase().includes(searchText.toLowerCase())||
                findCategory(expense.categoryId).toLowerCase().includes(searchText.toLowerCase())
        ){
                return expense
        }
    })

    

    const paginate=(num)=>{
        console.log('current page number inside func',num)
        setCurrentPage(num)
        dispatch(setPageNum(num))
    }

    
    

    const pageNumbers=[]
    
    for(let i=1;i<=Math.ceil(allExpenses.length/expensesPerPage);i++){
        pageNumbers.push(i)
    }
    console.log('page Numbers',pageNumbers)
    return (
        <div>
            {finalArr.length===0?<h2>{searchText?'No expenses found':'No expenses found. Add your first!'}</h2>:
                        <table className='table  table-hover table-dark'>
                        <thead>
                                <tr >
                                    <th >Category</th>
                                    <th>Item Name</th>
                                    <th >Amount</th>
                                    <th >Expense Date</th>
                                </tr>
                                
                        </thead>
                        <tbody>
                        {finalArr.map((expense)=>{
                            return <tr key={expense._id} style={{textDecoration:expense.isDeleted?'line-through':'none'}} className={expense.isDeleted&&'table-active'}>
                                 <ExpenseItem expense={expense} categories={categories}/> 
                            </tr>
                                })}                 
                                    
                            </tbody>
                    </table>
                        }

<nav>
            <ul className='pagination'>
                {pageNumbers.map((number)=>{
                    return <li key={number} className='page-item'>
                        <a href='#' onClick={()=>{
                            console.log('clicked page',number)
                             paginate(number) }} className='page-link'>
                            {number}
                        </a>
                    </li>
                })}
            </ul>
        </nav>
                          {/* <Pagination expensesPerPage={expensesPerPage} totalExpenses={allExpenses.length} paginate={paginate}/> */} 
        </div>

    )
})

export default React.memo(ExpenseTable)