import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Navigationbar from './components/navbar';
import Main from './components/main';
import Packpage from './components/packpage';
import Cardpage from './components/cardpage';
import Login from './components/login';
import Account from './components/Account';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigationbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/Pack/:id' element={<Packpage/>}/>
        <Route path='/Card/:id' element={<Cardpage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/game' element={<Game/>}/>
        <Route path='/*' element={<h1>404</h1>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

