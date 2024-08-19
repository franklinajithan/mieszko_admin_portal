import React, { Component } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import userAvatar from "../assets/img/img1.jpg";
import { FaTachometerAlt, FaBox, FaStore, FaBoxes, FaPeopleCarry, FaWarehouse, FaFileInvoice, FaTrashAlt, FaUserCog } from 'react-icons/fa';

import {
    dashboardMenu, OrderManagementMenu, storeManagementMenu,
    productManagementMenu, supplierManagementMenu,
    userManagementMenu, stockManagementMenu,
    invoiceManagementMenu, wasteManagementMenu,
} from "../data/Menu";

type MenuGroupKey = 'dashboard' | 'orderManagement' | 'storeManagement' | 'productManagement' | 'supplierManagement' | 'stockManagement' | 'invoiceManagement' | 'wasteManagement' | 'userManagement';

interface MenuItem {
    label: string;
    link?: string;
    icon?: string;
    submenu?: MenuItem[];
}

interface SidebarMenuState {
    menuGroups: Record<MenuGroupKey, boolean>;
}

interface SidebarState {
    footerMenuOpen: boolean;
}

class Sidebar extends Component<{}, SidebarState> {
    state: SidebarState = {
        footerMenuOpen: false,
    };

    toggleFooterMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this.setState(prevState => ({ footerMenuOpen: !prevState.footerMenuOpen }));
    }

    _scrollBarRef: PerfectScrollbar | null = null;

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
        );
    }
}

const SidebarMenu: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [menuGroups, setMenuGroups] = React.useState<SidebarMenuState['menuGroups']>({
        dashboard: false,
        orderManagement: false,
        storeManagement: false,
        productManagement: false,
        supplierManagement: false,
        stockManagement: false,
        invoiceManagement: false,
        wasteManagement: false,
        userManagement: false,
    });

    React.useEffect(() => {
        const findActiveMenuGroup = () => {
            const menuMap: Record<string, MenuGroupKey> = {
                '/dashboard/finance': 'dashboard',
                '/order/purchase-planning': 'orderManagement',
                '/order/new-purchase-planning': 'orderManagement',
                '/order/purchase-order': 'orderManagement',
                '/order/order-history': 'orderManagement',
                '/store/manage-store': 'storeManagement',
                '/store-management': 'storeManagement',
                '/product-management': 'productManagement',
                '/supplier-management': 'supplierManagement',
                '/stock-management': 'stockManagement',
                '/invoice-management': 'invoiceManagement',
                '/waste-management': 'wasteManagement',
                '/user-management': 'userManagement',
            };
            const activeMenuGroup = menuMap[currentPath];
            if (activeMenuGroup) {
                setMenuGroups(prevState => ({
                    ...prevState,
                    [activeMenuGroup]: true
                }));
            }
        };

        findActiveMenuGroup();
    }, [currentPath]);

    const toggleMenu = (menuLabel: MenuGroupKey) => {
        setMenuGroups(prevState => ({
            ...prevState,
            [menuLabel]: !prevState[menuLabel]
        }));
    }

    const populateMenu = (menuItems: MenuItem[]) => {
        return (
            <ul className="nav nav-sidebar">
                {menuItems.map((item, index) => {
                    const submenu = item.submenu ? item.submenu.map((subItem, subIndex) => (
                        <NavLink to={subItem.link || '#'} className="nav-sub-link" key={subIndex}>{subItem.label}</NavLink>
                    )) : null;

                    const isMenuGroupVisible = menuGroups[item.label as MenuGroupKey];

                    return (
                        <li key={index} className={`nav-item ${isMenuGroupVisible ? 'show' : ''}`}>
                            {!submenu ? (
                                <NavLink to={item.link || '#'} className="nav-link"><i className={item.icon || ''}></i> <span>{item.label}</span></NavLink>
                            ) : (
                                <div onClick={() => toggleMenu(item.label as MenuGroupKey)} className="nav-link has-sub"><i className={item.icon || ''}></i> <span>{item.label}</span></div>
                            )}
                            {submenu && <nav className="nav nav-sub">{submenu}</nav>}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <>
            <div className={`nav-group ${menuGroups.dashboard ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('dashboard')}>
                    <FaTachometerAlt className="nav-icon" size={20} /> Dashboard
                </div>
                {populateMenu(dashboardMenu)}
            </div>
            <div className={`nav-group ${menuGroups.orderManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('orderManagement')}>
                    <FaBox className="nav-icon" size={20}/> Order Management
                </div>
                {populateMenu(OrderManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.storeManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('storeManagement')}>
                    <FaStore className="nav-icon" size={20}/> Store Management
                </div>
                {populateMenu(storeManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.productManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('productManagement')}>
                    <FaBoxes className="nav-icon" size={20}/> Product Management
                </div>
                {populateMenu(productManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.supplierManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('supplierManagement')}>
                    <FaPeopleCarry className="nav-icon" size={20}/> Supplier Management
                </div>
                {populateMenu(supplierManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.stockManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('stockManagement')}>
                    <FaWarehouse className="nav-icon" size={20} /> Stock Management
                </div>
                {populateMenu(stockManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.invoiceManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('invoiceManagement')}>
                    <FaFileInvoice className="nav-icon" size={20} /> Invoice Management
                </div>
                {populateMenu(invoiceManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.wasteManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('wasteManagement')}>
                    <FaTrashAlt className="nav-icon" size={20}/> Waste Management
                </div>
                {populateMenu(wasteManagementMenu)}
            </div>
            <div className={`nav-group ${menuGroups.userManagement ? 'show' : ''}`}>
                <div className="nav-label" onClick={() => toggleMenu('userManagement')}>
                    <FaUserCog className="nav-icon" size={20}/> User Management
                </div>
                {populateMenu(userManagementMenu)}
            </div>
        </>
    );
}

window.addEventListener("click", function (e) {
    let tar = e.target as HTMLElement;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

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

export default Sidebar;