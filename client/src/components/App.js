import logo from '../logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Messageboard">
        <p class="Message">message</p>
      </div>
      <div className="Textbox">
        <svg src={logo} alt="" id="react-logo"></svg>
      </div>
    </div>
  );
}

export default App;
