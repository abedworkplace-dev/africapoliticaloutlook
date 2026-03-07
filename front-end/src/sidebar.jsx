import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink, Outlet } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { MdSecurity } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIdBadge } from "react-icons/fa";

export default function Sidebar() {
    const navigation = useNavigate()
    const [open1, setOpen1] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    useEffect(() => {
        if (localStorage.getItem("admin#token") === null) {
            navigation("/")
        }
    }, [navigation]);
    return (
        <div className="container">
            <div className='sidebar' style={{ marginLeft: openMenu ? "-320px" : "0px" }}>
                <div className="logo">
                    <img src="/images/logo-1.png" alt="" />
                </div>
                <ul className="menu">
                    <li>
                        <NavLink to="/sidebar/dashboard" className={({ isActive }) => isActive ? "link active" : "link"}>
                            <span><RiHome4Line className='i' />Dashboard</span>
                        </NavLink>
                    </li>
                    <li className='dropdown'>
                        <NavLink to='/sidebar/inscription' className={({ isActive }) => isActive ? "link active" : "link"} onClick={() => { setOpen1(!open1) }}>
                            <span>< FaUsers className='i' />Inscription</span>
                            <IoIosArrowDown className={open1 ? "arrow active" : "arrow"} />
                        </NavLink>
                        <div className={open1 ? "submenu active" : "submenu"}>
                            <NavLink to="/sidebar/inscription-reussie" className={({ isActive }) => isActive ? "link active" : "link"}><span>Réussie</span></NavLink>
                        </div>
                        <div className={open1 ? "submenu active" : "submenu"}>
                            <NavLink to="/sidebar/inscription-non-finalisee" className={({ isActive }) => isActive ? "link active" : "link"}><span>Non finalisée</span></NavLink>
                        </div>
                        <div className={open1 ? "submenu active" : "submenu"}>
                            <NavLink to="/sidebar/inscription-promo" className={({ isActive }) => isActive ? "link active" : "link"}><span>Via code promo</span></NavLink>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/sidebar/code-promo" className={({ isActive }) => isActive ? "link active" : "link"}>
                            <span><MdLocalOffer className='i' />Codes promos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sidebar/presse" className={({ isActive }) => isActive ? "link active" : "link"}>
                            <span><FaIdBadge className='i' />Accreditation presse</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sidebar/newsletter" className={({ isActive }) => isActive ? "link active" : "link"}>
                            <span><SiGmail className='i' />Newsletter</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sidebar/password" className={({ isActive }) => isActive ? "link active" : "link"}>
                            <span><MdSecurity className='i' />Sécurité</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sidebar/logout" className={({ isActive }) => isActive ? "link active" : "link"}>
                            <span><MdLogout className='i' />Deconnexion</span>
                        </NavLink>
                    </li>
                </ul>
            </div >
            <div className="contents">
                <div className="navbar">
                    <div className="header-left">
                        <HiBars3BottomLeft className='i-bars' onClick={() => setOpenMenu(!openMenu)} />
                        <div className="input-container">
                            <CiSearch className="i" />
                            <input type="text" placeholder="Rechercher..." />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className='notif'><IoMdNotificationsOutline className='i' /><span>01</span></div>
                        {JSON.parse(localStorage.getItem("admin#token")).role == "super-admin" ? <img src="/images/djogan.jpeg" alt="" /> : <img src="/images/apo.jpeg" alt="" />}
                    </div>
                </div>
                <div className='outlet'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
