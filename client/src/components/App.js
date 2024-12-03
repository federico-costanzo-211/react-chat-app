import { Messageboard } from './app-parts/Messageboard.js';
import { Textbar } from './app-parts/Textbar.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Messageboard />
      <Textbar />
    </div>
  );
}

export default App;
