import './App.css';
// import { Button} from '@chakra-ui/react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
// import { BrowserRouter } from 'react-router-dom';
import ChatProvider from "./Context/ChatProvider"
function App() {
  
  return (
     
    <Router>
      
      <div className="App">
        <ChatProvider>
          <Routes>
            <Route exact path='/' element={<Homepage/>}></Route>
            <Route exact path='/chats' element={<Chatpage/>}></Route>
          </Routes>
        </ChatProvider>
      </div>
    </Router>
      
  );

}

export default App;
