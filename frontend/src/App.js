import './App.css';
// import { Button} from '@chakra-ui/react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Homepage/>}></Route>
          <Route exact path='/chats' element={<Chatpage/>}></Route>
        </Routes>
      </div>
    </Router>
  );

}

export default App;
