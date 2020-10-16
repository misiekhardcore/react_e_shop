import React from 'react'
import './styles.scss'
import ShopMen from './../../assets/shopMens.jpg'
import ShopWomen from './../../assets/shopWomens.jpg'

const Directory = props =>{
    return(
        <div className='directory'>
            <div className='wrap'>
                <div className='item'
                style={{backgroundImage: `url(${ShopMen})`}}>
                    <button>Shop Mens</button>
                </div>
                <div className='item'
                style={{backgroundImage: `url(${ShopWomen})`}}>
                    <button>Shop Womens</button>
                </div>
            </div>
        </div>
    )
}

export default Directory