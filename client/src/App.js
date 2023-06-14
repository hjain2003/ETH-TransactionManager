import './App.css';
import Register from './components/Register/Register';
import Transaction from './components/Transaction/Transaction';
import Welcome from './components/WelcomeSection/Welcome'
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Welcome/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
    </>
  );
}

export default App;
