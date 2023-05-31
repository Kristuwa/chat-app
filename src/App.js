import { theme } from "./utils/theme";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Layout } from "./components/Layout/Layout";
import { lazy, useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { Refreshing } from "./App.styled";
import { Container } from "./pages/Home.styled";

const HomePage = lazy(() => import("./pages/Home"));
const ChatsPage = lazy(() => import("./pages/Chats"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <ThemeProvider theme={theme}>
      <Container>
        <Refreshing>Refreshing user...</Refreshing>
      </Container>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <ToastContainer
        icon={false}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/chats" component={HomePage} />
            }
          />
          <Route
            path="/chats"
            element={<PrivateRoute redirectTo="/" component={ChatsPage} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
