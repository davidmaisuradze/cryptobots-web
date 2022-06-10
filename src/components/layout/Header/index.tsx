/* eslint-disable no-debugger */
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";


const Header: FC = () => {
  
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <header className="header h-16 px-4 lg:bg-black sm:sm:bg-white flex justify-between">
      <div className="header-left flex">
        <Link className="header-logo lg:flex sm:hidden mr-[10px]" to="#">
          <img src="../../../assets/company-logo.jpg" className="w-full h-full" alt="company logo" />
        </Link>
        <div className={(isOpen ? "flex " : "hidden ") +"menu-links lg:flex-row sm:flex-col lg:flex sm:absolute sm:inset-x-0 sm:top-[64px] sm:bg-black sm:bottom-0 lg:static lg:justify-between"}>
          <Link className="menu-links__item sm:mt-[10px] lg:mr-[10px]" to={APP_ROUTES.MARKET}>
            <span className="static-text">Market</span>
          </Link>
          <Link className="menu-links__item sm:mt-[10px] lg:mr-[10px]" to={APP_ROUTES.MY_ASSETS}>
            <span className="static-text">My Assets</span>
          </Link>
          <Link className="menu-links__item sm:mt-[10px] lg:mr-[10px]" to={APP_ROUTES.CREATOR_DASHBOARD}>
            <span className="static-text">Creator Dashboard</span>
          </Link>
          <Link className="menu-links__item sm:mt-[10px]" to={APP_ROUTES.CREATE_ITEM}>
            <span className="static-text">Create Item</span>
          </Link>
        </div>
      </div>
      <div className="header-right flex lg:justify-center sm:justify-between items-center lg:pr-5 lg:w-auto sm:w-full">
        <Link to="#" className="text-gray-100">
          <button 
            type="button" 
            className="text-grey-200 rounded bg-blue-500 px-[20px] py-[10px] leading-5 btn-wallet-clip"
          >
            <span className="static-text">Connect to wallet</span></button>
        </Link>
        <div onClick={() => {setOpen(!isOpen);}} className="lg:hidden sm:flex burger-icon flex justify-center items-center h-full">
          <FontAwesomeIcon  fontSize={25} icon={isOpen ? faX : faBars} />
        </div>
      </div>
    </header>
  );
};

export default Header;