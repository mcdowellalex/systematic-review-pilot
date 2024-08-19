import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";
import { PropsWithChildren } from "react";

interface props extends PropsWithChildren {
  to: string;
}
const NavItem = ({ to, children }: props) => {
  return (
    <li className={styles.navItem}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};
export default NavItem;
