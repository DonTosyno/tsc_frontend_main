import React from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import logo from '../../../assets/icons/TSC.png'

import sidebar_items from '../../../assets/JsonData/sidebar_routes_school.json'

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = ({props}) => {
    // // console.log('props from sidebar');
    // // console.log(props)
    const activeItem = sidebar_items.findIndex(item => item.route === props.pathname)
    // // console.log(activeItem)
    return (
        <div className='sidebar'>
            <div className="sidebar__logo" >
                <img src={logo} alt="company logo" />
            </div>
            {
                sidebar_items.map((item, index) => (
                   item.route === '/dashboard/school' ? null : (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                   )
                ))
            }
            <Link to="/">
                        <SidebarItem
                            title={"Log out"}
                            icon={""}
                            active={false}
                        />
                    </Link>
        </div>
    )
}

export default Sidebar
