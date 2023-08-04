import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Navbar />
      <AllRoutes />
      <Toaster />
    </>
  );
}

export default App;
