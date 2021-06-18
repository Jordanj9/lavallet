import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  title: string;
  active: boolean;
  url: string;
}

const Header: React.FC<{
  title: string;
  description: string;
  tabs: Tab[];
}> = ({ title, description, tabs }) => {
  const location = useLocation();

  useEffect(() => {
    for (let item of tabs) {
      const element = window.document.getElementById(item.id);
      if (element !== null) {
        if (location.pathname === item.url) {
          element.classList.add("active");
          item.active = true;
        } else {
          element.classList.remove("active");
          element.classList.add("text-gray-500");
          item.active = false;
        }
      }
    }
  }, [location]);

  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-gray-600 uppercase text-xl">{title}</h2>
          <p className="text-sm md:text-lg text-gray-500">{description}</p>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <ul className="tab flex mt-6 text-sm md:text-lg">
        {tabs.map(item => (
          <li
            key={item.id}
            id={item.id}
            className={item.active ? "active mr-4" : "mr-4"}
          >
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
