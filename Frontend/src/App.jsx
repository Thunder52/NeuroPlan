import {Routes,Route} from 'react-router-dom';
import LoginRegisterPage from './Pages/LoginRegisterPage/LoginPage';
import './App.css'
import Home from './Pages/HomePage/Home';

const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />}/>
      <Route path='/' element={<LoginRegisterPage />}/>

    </Routes>
  );
};

export default App;
