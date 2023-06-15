import './App.css';
import Register from './components/Register/Register';
import Transaction from './components/Transaction/Transaction';
import Welcome from './components/WelcomeSection/Welcome'
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Welcome/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/logout' element={<Logout/>}/>
   </Routes>
    </>
  );
}

export default App;
