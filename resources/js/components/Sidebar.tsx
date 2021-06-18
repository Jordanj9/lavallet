import React, { Dispatch, useCallback, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

//css
import "../../css/sidebar.css";

//assets
import logo from "../../assets/images/logo-lavallet.png";
import axios from "axios";
import { logout as signOut } from "../redux/actionCreators/userCreators";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  let location = useLocation();
  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    let path = location.pathname.substr(1).split("/");
    const item = document.getElementById(path[0]);
    if (item !== null) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar !== null) {
        for (let item of sidebar.children as any) {
          item.className = "";
        }
      }
      item.classList.add("effect-menu");
    }
  }, [location]);

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(resp => {
        logout();
        history.push("/login");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div
      className="fixed  h-screen w-2/12"
      style={{ backgroundColor: "#45BF55" }}
    >
      <img
        src={logo}
        loading="lazy"
        alt="logo"
        className="w-2/4 mt-4 mx-auto"
      />
      <div className="mt-4 ml-8">
        <ul
          className="text-gray-50"
          style={{ fontFamily: "Poppins, sans-serif" }}
          id="sidebar"
        >
          <li id="usuario">
            <div className="p-2 flex items-center">
              <svg
                className="h-6 w-6 -mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <Link to="/dashboard/usuario/todos">Usuario</Link>
            </div>
          </li>
          <li id="transito">
            <div className="p-2 flex items-center">
              <svg
                className="h-6 w-6 -mt-1 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  fill="#fff"
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
              <Link to="/dashboard/transito/entrada">Transito</Link>
            </div>
          </li>
          <li id="contratacion">
            <div className="p-2 flex items-cente">
              <svg
                className="h-6 w-6 -mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <Link to="/dashboard/contratacion/contrato">Contratación</Link>
            </div>
          </li>
          <li id="generales">
            <div className="p-2 flex items-center">
              <svg
                className="h-6 w-6 -mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <Link to="/dashboard/generales/materiales">Generales</Link>
            </div>
          </li>
          <li id="reportes">
            <div className="p-2 flex items-center">
              <svg
                className="h-6 w-6 -mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <Link to="/dashboard/reportes/materiales">Reportes</Link>
            </div>
          </li>
          <li id="exit">
            <div className="p-2 flex items-center">
              <svg
                className="h-6 w-6 -mt-1 text-gray-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <button onClick={() => handleLogout()}>Exit</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
