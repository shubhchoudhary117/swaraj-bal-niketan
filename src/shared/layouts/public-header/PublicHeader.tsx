import React, { useState } from 'react'
import "./PublicHeader.scss"

import logo from "./assets/header-logo.png"
import { UserRound, Menu, X } from 'lucide-react'

const PublicHeader = () => {
    const [open, setOpen] = useState(false)

    return (
        <header className="p-header">
            <nav className="p-header__nav">

                <div className="p-header__left">
                    <div className="p-header__logoblock">
                        <img src={logo} className="p-header__slogo" />
                        <div className="p-header__content">
                            <h1 className="p-header__title">SWARAJ</h1>
                            <p className="p-header__subtitle">Bal Niketan School</p>
                            <p className='p-header__tagline'>Learn . Grow . Successed</p>
                        </div>
                    </div>
                </div>


                <div className="p-header__right">
                    <div className={`p-header__menus ${open ? 'active' : ''}`}>
                        <ul className="p-header__menus-list">
                            <li className='p-header__menus-item active'>Home</li>
                            <li className='p-header__menus-item'>About Us</li>
                            <li className='p-header__menus-item'>Academics</li>
                            <li className='p-header__menus-item'>Courses</li>
                            <li className='p-header__menus-item'>Gallery</li>
                            <li className='p-header__menus-item'>Achievements</li>
                            <li className='p-header__menus-item'>Contact Us</li>
                        </ul>
                        <div className="p-header__sidebar-actions">
                            <button className="p-header__sidebar-action-btn">
                                <UserRound className="icon" />
                                <span className="text">
                                    Student
                                    <small>Login</small>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="p-header__actions">
                        <button className="p-header__action-btn">
                            <UserRound className="icon" />
                            <span className="text">
                                Student
                                <small>Login</small>
                            </span>
                        </button>
                    </div>

                    <div className="p-header__hamburger" onClick={() => setOpen(!open)}>
                        {open ? <X className='icon' /> : <Menu className='icon' />}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default PublicHeader