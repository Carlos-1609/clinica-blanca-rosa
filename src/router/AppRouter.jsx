import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import { PacientesRoutes } from "../components/routes/PacientesRoutes";
import { WrapperSpinner } from "../components/ui/WrapperSpinner";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <WrapperSpinner />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<PacientesRoutes />}></Route>
      ) : (
        <Route path="/" element={<Login />}></Route>
      )}
      <Route path="/*" element={<Navigate to="/" />}></Route>
      {/* <Route path="/" element={<Login />}></Route>
      <Route path="/*" element={<PacientesRoutes />}></Route> */}
    </Routes>
  );
};
