import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./comp/shared/Header.js";
import BottomNav from "./comp/shared/BottomNav.js";
import Home from "./pages/Home.js";
import Auth from "./pages/Auth.js";
import Order from "./pages/Order.js";
import Tables from "./pages/Tables.js";
import Menu from "./pages/Menu.js";
import { useSelector } from "react-redux";
import useLoadUserData from "./hooks/useLoadData.js";
import { ClipLoader } from "react-spinners";
import Dashboard from "./pages/Dashboard.js";
import PaymentSuccess from "./pages/PaymentSuccess.js";
import PaymentFailure from "./pages/PaymentFailure.js";



  const ProtectedRoutes = ({children}: any) => {
      const { isAuth } = useSelector((state: any) => state.user);
    if (!isAuth) {
      return <Navigate to={"/auth"} />
    }
    return children
  };



const Layout = () => {
  const location = useLocation();
  const hidePathLayout = ["/auth"];
  const { isAuth } = useSelector((state: any) => state.user);
 
  const isLoading = useLoadUserData()

  if(isLoading) return <ClipLoader size={40} color="#facc15" />



  return (
    <>
      {!hidePathLayout.includes(location.pathname) && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/auth" element={isAuth ? <Navigate to={'/'} /> : <Auth /> } />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        {/* matches /menu and deeper nested routes */}
        <Route
          path="/menu/*"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/processing"
          element={
            <ProtectedRoutes>
              <PaymentFailure />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoutes>
              <PaymentSuccess />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/failure"
          element={
            <ProtectedRoutes>
              <PaymentFailure />
            </ProtectedRoutes>
          }
        />

        {/* fallback route (use "*") */}
        <Route path="*" element={<div>Nothing Found</div>} />
      </Routes>
      {!hidePathLayout.includes(location.pathname) && <BottomNav />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
