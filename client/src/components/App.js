import { useState } from 'react';

import { Messageboard } from './app-parts/Messageboard.js';
import { Textbar } from './app-parts/Textbar.js';

import './App.css';

function App() {
  const [messageList, setMessageList] = useState([]);

  function addMessage(text){    
    setMessageList(Array.from([...messageList, String(text)]));
  };

  return (
    <div className="App">
      <Messageboard messageList={messageList} />
      <Textbar addMessageCallback={addMessage} />
    </div>
  );
}

export default App;
