import './App.css';
import {BrowserRouter, Routes, Route,useNavigate} from 'react-router-dom'
import Home from './Home';
import UserResponse from './UserResponse';
import PrivateComponent from './PrivateComponent'


function App() {

  
  const responseArray = [];
  return (
    <div className="App">
       
      <BrowserRouter>
        <Routes>
       
        <Route element={<PrivateComponent/>} >
             <Route path='/response' element={<UserResponse resp = {responseArray}/>}/>
          </Route>
          <Route path='/' element={<Home getResp = {responseArray}/>}/>
         
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
