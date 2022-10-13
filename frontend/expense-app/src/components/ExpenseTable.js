import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import ExpenseItem from './ExpenseItem'
import Pagination from './Pagination'
const ExpenseTable=(props)=>{
    const {searchText}=props
    const expenses=useSelector(state=>state.expenses)
    const deletedExpenses=useSelector(state=>state.deletedExpenses)
    const categories=useSelector(state=>state.categories)
    const allExpenses=[...expenses,...deletedExpenses].sort(function(a,b){
        return new Date(b.date)- new Date(a.date)
    })
    console.log('all expenses in Expense Table',allExpenses)
    console.log('all categoris in expense table comp',categories)

    const [currentPage,setCurrentPage]=useState(1)
    const [expensesPerPage,setExpensesPerPage]=useState(3)
    const indexOfLastExpense=currentPage*expensesPerPage
    const indexOfFirstExpense=indexOfLastExpense-expensesPerPage
    const currentExpenses=allExpenses.slice(indexOfFirstExpense,indexOfLastExpense)
    console.log('current expenses',currentExpenses)
    console.log('current page number',currentPage)
    

    const paginate=(num)=>{
        console.log('current page number inside func',num)
        setCurrentPage(num)
    }

    const findCategory=(id)=>{
        const res=categories.find(category=>category._id===id)
        return res.name
    }

    const finalArr=allExpenses.filter((expense)=>{
        if(searchText===''){
            return expense
        }
        else if(expense.name.toLowerCase().includes(searchText.toLowerCase())||
                findCategory(expense.categoryId).toLowerCase().includes(searchText.toLowerCase())
        ){
                return expense
        }
    })
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
                         {/* <Pagination expensesPerPage={expensesPerPage} totalExpenses={allExpenses.length} paginate={paginate}/> */}
        </div>

    )
}

export default React.memo(ExpenseTable)