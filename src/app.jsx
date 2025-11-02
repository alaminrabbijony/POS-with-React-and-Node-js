import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Home, Auth, Order } from "./pages";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}
