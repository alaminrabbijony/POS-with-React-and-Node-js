import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./comp/shared/Header.js";
import BottomNav from "./comp/shared/BottomNav.js";
import Home from "./pages/Home.js";
import Auth from "./pages/Auth.js";
import Order from "./pages/Order.js";
import Tables from "./pages/Tables.js";
import Menu from "./pages/Menu.js";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/order" element={<Order />} />
        <Route path="/tables" element={<Tables />} />

        {/* matches /menu and deeper nested routes */}
        <Route path="/menu/*" element={<Menu />} />

        {/* fallback route (use "*") */}
        <Route path="*" element={<div>Nothing Found</div>} />
      </Routes>

      <BottomNav />
    </Router>
  );
}
