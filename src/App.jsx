import "./App.css";
import Login from "./components/login/Login";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faBars,
//   faXmark,
//   faUser,
//   faArrowLeft,
// } from "@fortawesome/free-solid-svg-icons";

// library.add(faBars, faXmark, faUser);

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;
