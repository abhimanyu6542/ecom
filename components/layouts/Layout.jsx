import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// import { Provider } from "react-redux";
// import store from "@bable/redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Provider store={store}> */}
       <Navbar />
        <ToastContainer />
        <div className="mt-32">{children}</div>
        <Footer />
       
      {/* </Provider> */}
    </>
  );
};
export default Layout;
