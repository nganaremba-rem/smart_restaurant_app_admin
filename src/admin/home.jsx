import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  BsCash,
  BsFillArchiveFill,
  BsFillBellFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from 'react-icons/bs'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import GetReq from '../GetReq'

function Home() {
  const [productCount, setProductCount] = useState(0)
  const [cusineCount, setCusineCount] = useState(0)
  const [customerCount, setCustomerCount] = useState(0)
  const [menu, setMenu] = useState([])
  const [income, setIncome] = useState(0)

  const [apiURL, setAPIURL] = useState('/menuItems')

  useEffect(() => {
    console.log('menu')

    GetReq(apiURL).then((res) => {
      setMenu(res)
      setProductCount(res.length)
      const cusines = [...new Set(res.map((item) => item.cuisine))]
      setCusineCount(cusines.length)
      console.log(res.length)
      console.log(cusines.length)
    })
    console.log('customer')
    const customersAPIURL = '/users/customers'
    GetReq(customersAPIURL).then((res) => {
      setCustomerCount(res.length)
      console.log(res.length)
    })

    const incomeAPIURL = '/orders/calculateTotalForDay' // Replace with the actual API URL
    GetReq(incomeAPIURL).then((res) => {
      setIncome(res.amount)
    })
  }, [apiURL])

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>DISHES</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{productCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSINES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{cusineCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{customerCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>DAILY INCOME</h3>
            <BsCash className='card_icon' />
          </div>
          <h1>{income}</h1>
        </div>
      </div>
    </main>
  )
}

export default Home
