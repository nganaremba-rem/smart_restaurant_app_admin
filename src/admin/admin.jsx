import React, { useState, useEffect } from 'react'
import { Axios } from '../config'
import Header from './header'
import Home from './home'
import Sidebar from './sidebar'

import styles from './admin.css'

//import Sidebar from "./sidebar";

function App({ openSidebarToggle, OpenSidebar }) {
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Home />
    </div>
  )
}

export default App
