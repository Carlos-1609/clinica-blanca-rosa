import "./App.css";
import Login from "./components/login/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faXmark, faUser);

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;
