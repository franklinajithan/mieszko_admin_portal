import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import userAvatar from "../assets/img/img1.jpg";
import notification from "../data/Notification";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ onSkin }: { onSkin: any }) {
  const { t, i18n } = useTranslation("english");
  const [selectedOption, setSelectedOption] = useState("default");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user: any = useSelector((state: RootState) => state.auth.user);
  const CustomToggle = React.forwardRef<HTMLAnchorElement, any>(({ children, onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </a>
  ));

  const toggleSidebar = (e: any) => {
    e.preventDefault();
    let isOffset = document.body.classList.contains("sidebar-offset");
    if (isOffset) {
      document.body.classList.toggle("sidebar-show");
    } else {
      if (window.matchMedia("(max-width: 991px)").matches) {
        document.body.classList.toggle("sidebar-show");
      } else {
        document.body.classList.toggle("sidebar-hide");
      }
    }
  };

  const handleSignOut = () => {
    // Clear any stored authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("Language");
    localStorage.removeItem("skin-mode");
    localStorage.removeItem("sidebar-skin");

    // Redirect to the sign-in page
    window.location.href = "/pages/signin2";
  };

  function NotificationList() {
    const notiList = notification.map((item, key) => (
      <li className="list-group-item" key={key}>
        <div className={item.status === "online" ? "avatar online" : "avatar"}>{item.avatar}</div>
        <div className="list-group-body">
          <p>{item.text}</p>
          <span>{item.date}</span>
        </div>
      </li>
    ));

    return <ul className="list-group">{notiList}</ul>;
  }

  const skinMode = (e: any) => {
    e.preventDefault();
    e.target.classList.add("active");

    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE) node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }

    let skin = e.target.textContent.toLowerCase();
    let HTMLTag = document.querySelector("html");

    if (skin === "dark") {
      HTMLTag?.setAttribute("data-skin", skin);
      localStorage.setItem("skin-mode", skin);

      onSkin(skin);
    } else {
      HTMLTag?.removeAttribute("data-skin");
      localStorage.removeItem("skin-mode");

      onSkin("");
    }
  };

  const handleChangeLanguge = (e: any, Lang: string) => {
    e.preventDefault();
    i18n.changeLanguage(Lang);
    e.target.classList.add("active");

    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE) node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }

    let lang = e.target.textContent.toLowerCase();
    localStorage.setItem("Language", lang);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const sidebarSkin = (e: any) => {
    e.preventDefault();
    e.target.classList.add("active");

    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE) node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }

    let skin = e.target.textContent.toLowerCase();
    let HTMLTag = document.querySelector("html");

    HTMLTag?.removeAttribute("data-sidebar");

    if (skin !== "default") {
      HTMLTag?.setAttribute("data-sidebar", skin);
      localStorage.setItem("sidebar-skin", skin);
    } else {
      localStorage.removeItem("sidebar-skin");
    }
  };

  return (
    <div className="header-main px-3 px-lg-4">
      <a href="#" onClick={toggleSidebar} className="menu-link me-3 me-lg-4">
        <i className="ri-menu-2-fill"></i>
      </a>

      <div className=" me-auto">
        {/* <input type="text" className="form-control" placeholder="Search" />
        <i className="ri-search-line"></i> */}
      </div>

      <div className="row">
        <div className="col-2">
          <i className="ri-store-line text-2xl"></i>
        </div>
        <div className="col-10">
          <form className="mx-auto">
            <select id="small" value={selectedOption} onChange={handleChange} className="w-64 p-2 text-sm text-zinc-900 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {selectedOption === "default" && (
                <option value="default" hidden>
                  Choose the Store
                </option>
              )}
              <option value="headOffice">Head Office</option>
              <option value="eastham">East Ham</option>
              <option value="gravesend">Gravesend</option>
              <option value="hayes">Hayes</option>
              <option value="hounslow">Hounslow</option>
              <option value="perivale">Perivale</option>
              <option value="streatham">Streatham</option>
              <option value="sudbury">Sudbury</option>
              <option value="swindon">Swindon</option>
              <option value="watford">Watford</option>
            </select>
          </form>
        </div>
      </div>

      <Dropdown className="ml-3 dropdown-skin" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <i className="ri-settings-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <label>Language</label>
          <nav className="nav nav-skin">
            <a href="#" id="langEn" onClick={(e) => handleChangeLanguge(e, "en")} className={localStorage.getItem("Language") === "english" ? "nav-link" : "nav-link active"}>
              English
            </a>
            <a href="#" id="langPl" onClick={(e) => handleChangeLanguge(e, "pl")} className={localStorage.getItem("Language") === "polish" ? "nav-link active" : "nav-link"}>
              Polish
            </a>
            <a href="#" id="langTa" onClick={(e) => handleChangeLanguge(e, "ta")} className={localStorage.getItem("Language") === "tamil" ? "nav-link active" : "nav-link"}>
              Tamil
            </a>
          </nav>
          <hr />

          <label>Skin Mode</label>
          <nav className="nav nav-skin">
            <a href="#" onClick={skinMode} className={localStorage.getItem("skin-mode") ? "nav-link" : "nav-link active"}>
              Light
            </a>
            <a href="#" onClick={skinMode} className={localStorage.getItem("skin-mode") ? "nav-link active" : "nav-link"}>
              Dark
            </a>
          </nav>
          <hr />
          <label>Sidebar Skin</label>
          <nav id="sidebarSkin" className="nav nav-skin">
            <a href="#" onClick={sidebarSkin} className={!localStorage.getItem("sidebar-skin") ? "nav-link active" : "nav-link"}>
              Default
            </a>
            <a href="#" onClick={sidebarSkin} className={localStorage.getItem("sidebar-skin") === "prime" ? "nav-link active" : "nav-link"}>
              Prime
            </a>
            <a href="#" onClick={sidebarSkin} className={localStorage.getItem("sidebar-skin") === "dark" ? "nav-link active" : "nav-link"}>
              Dark
            </a>
          </nav>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="dropdown-notification ms-3 ms-xl-4" align="end">
        <span
          onClick={() => navigate("/messages")} // Redirects to the messages page
          style={{ cursor: "pointer" }}
        >
          <i className="ri-chat-3-line"></i>
        </span>
      </Dropdown>

      <Dropdown className="dropdown-notification ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <small>3</small>
          <i className="ri-notification-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f me--10-f">
          <div className="dropdown-menu-header">
            <h6 className="dropdown-menu-title">Notifications</h6>
          </div>
          {NotificationList()}
          <div className="dropdown-menu-footer">
            <Link to="#">Show all Notifications</Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="dropdown-profile ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <div className="avatar online">
            <img src={userAvatar} alt="" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <div className="dropdown-menu-body">
            <div className="avatar avatar-xl online mb-3">
              <img src={userAvatar} alt="" />
            </div>

            {isAuthenticated && <h5 className="mb-1 text-dark fw-semibold">Hello {user?.firstName}</h5>}
            <p className="fs-sm text-secondary">{user?.email}</p>

            <nav className="nav">
              <Link to="">
                <i className="ri-edit-2-line"></i> Edit Profile
              </Link>
              <Link to="">
                <i className="ri-profile-line"></i> View Profile
              </Link>
            </nav>
            <hr />
            <nav className="nav">
              <Link to="">
                <i className="ri-question-line"></i> Help Center
              </Link>
              <Link to="">
                <i className="ri-lock-line"></i> Privacy Settings
              </Link>
              <Link to="">
                <i className="ri-user-settings-line"></i> Account Settings
              </Link>
              <Link to="#" onClick={handleLogout}>
                <i className="ri-logout-box-r-line"></i> Log Out
              </Link>
            </nav>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
