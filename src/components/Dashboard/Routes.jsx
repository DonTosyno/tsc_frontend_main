import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
        </Routes>
        
    )
}

export default DashboardRoutes
