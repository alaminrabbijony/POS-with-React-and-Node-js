import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Auth, Order, Tables, Menu } from "./pages";
import Header from "./comp/shared/Header";
import BottomNav from "./comp/shared/BottomNav";
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/order" element={<Order />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu*" element={<Menu />} />
        <Route path="" element={<div>Nothing Found</div>} />
      </Routes>
      <BottomNav />
    </Router>
  );
}
