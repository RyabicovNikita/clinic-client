import { Route, Routes } from "react-router";
import { Auth, Complaints, MainPage } from "./components";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/complaints" element={<Complaints />} />
    </Routes>
  );
}

export default AppRoutes;
