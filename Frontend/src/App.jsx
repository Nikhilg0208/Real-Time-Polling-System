import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/common/Protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/authAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        console.log("data", data);
        dispatch(userExist(data?.data));
      } else dispatch(userNotExist());
    });
  },);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={user ? true : false}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
