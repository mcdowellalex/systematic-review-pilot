import { NavLink } from "react-router-dom";
import { Loading } from "../components/general/Loading/Loading";

function FourOhFourPage() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ margin: 0 }}>404 page not found</h1>
      <Loading />
      <NavLink style={{ margin: "20px" }} to="/">
        go home
      </NavLink>
    </div>
  );
}

export { FourOhFourPage };
