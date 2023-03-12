import { NavLink } from "react-router-dom";
import Style from "./GlobalNavStyle.module.css";

const GlobalNav = () => {

  const navLinks = [
    {
      id: 1,
      to: "/",
      value: "Users"
    },
    {
      id: 2,
      to: "/user/register",
      value: "Register User"
    }
  ]

  return (
    <nav className={Style.container}>
      {navLinks.map((link) => {
        return (
          <NavLink
            to={link.to}
            key={link.id}
            end
            className={({ isActive }) => (isActive ? Style.active : "")}
          >
            {link.value}
          </NavLink>
        )
      })}
    </nav>
  );
};

export default GlobalNav;
