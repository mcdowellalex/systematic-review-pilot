import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";
import { Nav } from "../Nav/Nav";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.page}>{children}</div>
    </div>
  );
}

export { Layout };
