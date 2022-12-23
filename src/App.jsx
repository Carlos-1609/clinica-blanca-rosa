import "./App.css";
import Login from "./components/login/Login";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppRouter } from "./router/AppRouter";

config.autoAddCss = false;

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
