import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <main className="px-28">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
