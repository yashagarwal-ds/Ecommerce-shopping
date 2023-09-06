import logo from './logo.svg';
import './App.css';
import Register from './components/Register/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import RouterList from './components/Routes/RouterList';

function App() {
  return (
    <div>
      <ToastContainer theme={"colored"} />
      <RouterList />
    </div>
  );
}

export default App;
