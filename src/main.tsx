import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Registration,
  Blog,
  ChangePassword,
  Features,
  Home,
  JoinUs,
  Login,
  Pricing,
  Training,
  Error,
  Account,
  AddTraining,
} from "./pages/index.js";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import { Provider } from "react-redux";
import { store } from "./state/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="registration/:role" element={<Registration />} />
            <Route
              path="blog"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="features"
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              }
            />
            <Route path="join-us" element={<JoinUs />} />
            <Route path="login" element={<Login />} />
            <Route path="pricing" element={<Pricing />} />
            <Route
              path="change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="training"
              element={
                <ProtectedRoute>
                  <Training />
                </ProtectedRoute>
              }
            />
            <Route
              path="training/add"
              element={
                <ProtectedRoute>
                  <AddTraining />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
