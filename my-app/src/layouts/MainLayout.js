import React from 'react'
import Header from './../components/Header'
import './../../src/default.scss'
import Footer from './../components/Footer'

const MainLayout = props =>{
    return(
        <div>
            <Header/>
            <div className='wrapper'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout