import React, { useEffect, useState } from 'react'
import "./PublicHeader.scss"
import { scroller } from "react-scroll"
import logo from "./assets/header-logo.png"
import { UserRound, Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styleEffect } from 'framer-motion'

const PublicHeader = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("");


    const menuItems = [
        { label: "Home", type: "scroll", target: "home" },
        { label: "About Us", type: "scroll", target: "about" },
        { label: "Courses", type: "scroll", target: "courses" },
        { label: "Facilities", type: "scroll", target: "facilities" },
        { label: "Teachers", type: "route", path: "/teachers" },
        { label: "Contact Us", type: "scroll", target: "contact" },
    ];


    const handleClick = (item: any) => {
        if (item.type === "route") {
            navigate(item.path);
            return;
        }

        setActiveSection(item.target);

        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: item.target } });
        } else {
            scroller.scrollTo(item.target, {
                smooth: true,
                duration: 500,
                offset: -80,
            });
        }
    };


    useEffect(() => {
        if (location.pathname !== "/") {
            setActiveSection(""); 
        } else {
            setActiveSection("home"); 
        }
    }, [location.pathname]);

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
                            {menuItems.map((item, i) => (
                                <li
                                    key={i}
                                    className={`p-header__menus-item ${item.type === "route"
                                        ? location.pathname === item.path
                                            ? "active"
                                            : ""
                                        : location.pathname === "/" && activeSection === item.target
                                            ? "active"
                                            : ""
                                        }`}
                                    onClick={() => handleClick(item)}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                        <div className="p-header__sidebar-actions">
                            <button className="p-header__sidebar-action-btn" onClick={() => navigate('/student-login')}>
                                <UserRound className="icon" />
                                <span className="text">
                                    Student
                                    <small>Login</small>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="p-header__actions">
                        <button className="p-header__action-btn" onClick={()=>navigate("/student-login")}>
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