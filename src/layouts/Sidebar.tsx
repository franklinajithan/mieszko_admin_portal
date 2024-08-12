import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import userAvatar from "../assets/img/img1.jpg";
import { FaTachometerAlt, FaBox, FaStore, FaBoxes, FaPeopleCarry, FaWarehouse, FaFileInvoice, FaTrashAlt, FaUserCog } from 'react-icons/fa'; // Example icons

import {
    dashboardMenu, ManagementMenu, OrderManagementMenu, storeManagementMenu,
    productManagementMenu,
    supplierManagementMenu,
    userManagementMenu,
    stockManagementMenu,
    invoiceManagementMenu,
    wasteManagementMenu,
} from "../data/Menu";

export default class Sidebar extends Component {



    
    state = {
        footerMenuOpen: false,  // Initial state to manage footer menu toggle
    };

    toggleFooterMenu = (e: any) => {
        e.preventDefault();
        this.setState({ footerMenuOpen: !this.state.footerMenuOpen });  // Toggle the footer menu state
    }

    _scrollBarRef: any;

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">MIESZKO</Link>
                </div>
                <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref}>
                    <SidebarMenu />

                </PerfectScrollbar>
                <div className="sidebar-footer">
                    <div className="sidebar-footer-top">
                        <div className="sidebar-footer-thumb">
                            <img src={userAvatar} alt="" />
                        </div>
                        <div className="sidebar-footer-body">
                            <h6><Link to="../pages/profile.html">Shaira Diaz</Link></h6>
                            <p>Premium Member</p>
                        </div>
                        <Link onClick={this.toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
                    </div>
                    <div className={`sidebar-footer-menu ${this.state.footerMenuOpen ? 'footer-menu-show' : ''}`}>
                        <nav className="nav">
                            <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link>
                            <Link to=""><i className="ri-profile-line"></i> View Profile</Link>
                        </nav>
                        <hr />
                        <nav className="nav">
                            <Link to=""><i className="ri-question-line"></i> Help Center</Link>
                            <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
                            <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link>
                            <Link to=""><i className="ri-logout-box-r-line"></i> Log Out</Link>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

class SidebarMenu extends Component {
    state = {
        menuGroups: {
            dashboard: false,
            orderManagement: false,
            storeManagement: false,
            productManagement: false,
            supplierManagement: false,
            stockManagement: false,
            invoiceManagement: false,
            wasteManagement: false,
            userManagement: false,
        },
    };
    populateMenu = (m: any) => {
        const menu = m.map((m: any, key: any) => {
            let sm;
            if (m.submenu) {
                sm = m.submenu.map((sm: any, key: any) => {
                    return (
                        <NavLink to={sm.link} className="nav-sub-link" key={key}>{sm.label}</NavLink>
                    );
                });
            }
    
            // Type assertion here
            const isMenuGroupVisible = this.state.menuGroups[m.label as keyof typeof this.state.menuGroups];
    
            return (
                <li key={key} className={`nav-item ${isMenuGroupVisible ? 'show' : ''}`}>
                    {(!sm) ? (
                        <NavLink to={m.link} className="nav-link"><i className={m.icon}></i> <span>{m.label}</span></NavLink>
                    ) : (
                        <div onClick={() => this.toggleSubMenu(m.label)} className="nav-link has-sub"><i className={m.icon}></i> <span>{m.label}</span></div>
                    )}
                    {m.submenu && <nav className="nav nav-sub">{sm}</nav>}
                </li>
            );
        });
    
        return (
            <ul className="nav nav-sidebar">
                {menu}
            </ul>
        );
    }

    toggleMenu = (menuLabel: string) => {
        this.setState(prevState => ({
            menuGroups: {
                ...prevState.menuGroups,
                [menuLabel]: !prevState.menuGroups[menuLabel]
            }
        }));
    }

    toggleSubMenu = (menuLabel: string) => {
        this.setState(prevState => ({
            menuGroups: {
                ...prevState.menuGroups,
                [menuLabel]: !prevState.menuGroups[menuLabel]
            }
        }));
    }

    render() {
        return (
            <React.Fragment>
                <div className={`nav-group ${this.state.menuGroups.dashboard ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('dashboard')}>
                        <FaTachometerAlt className="nav-icon" size={20} /> Dashboard
                    </div>
                    {this.populateMenu(dashboardMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.orderManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('orderManagement')}>
                        <FaBox className="nav-icon" size={20}/> Order Management
                    </div>
                    {this.populateMenu(OrderManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.storeManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('storeManagement')}>
                        <FaStore className="nav-icon" size={20}/> Store Management
                    </div>
                    {this.populateMenu(storeManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.productManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('productManagement')}>
                        <FaBoxes className="nav-icon" size={20}/> Product Management
                    </div>
                    {this.populateMenu(productManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.supplierManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('supplierManagement')}>
                        <FaPeopleCarry className="nav-icon" size={20}/> Supplier Management
                    </div>
                    {this.populateMenu(supplierManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.stockManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('stockManagement')}>
                        <FaWarehouse className="nav-icon" size={20} /> Stock Management
                    </div>
                    {this.populateMenu(stockManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.invoiceManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('invoiceManagement')}>
                        <FaFileInvoice className="nav-icon" size={20} /> Invoice Management
                    </div>
                    {this.populateMenu(invoiceManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.wasteManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('wasteManagement')}>
                        <FaTrashAlt className="nav-icon" size={20}/> Waste Management
                    </div>
                    {this.populateMenu(wasteManagementMenu)}
                </div>
                <div className={`nav-group ${this.state.menuGroups.userManagement ? 'show' : ''}`}>
                    <div className="nav-label" onClick={() => this.toggleMenu('userManagement')}>
                        <FaUserCog className="nav-icon" size={20}/> User Management
                    </div>
                    {this.populateMenu(userManagementMenu)}
                </div>
              
            </React.Fragment>
        )
    }
}

window.addEventListener("click", function (e) {
    // Close sidebar footer menu when clicked outside of it
    let tar = e.target as HTMLElement;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

    // Hide sidebar offset when clicked outside of sidebar
    if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
        document?.querySelector("body")?.classList.remove("sidebar-show");
    }
});

window.addEventListener("load", function () {
    let skinMode = localStorage.getItem("sidebar-skin");
    let HTMLTag = document.querySelector("html");

    if (skinMode) {
        HTMLTag?.setAttribute("data-sidebar", skinMode);
    }
});
