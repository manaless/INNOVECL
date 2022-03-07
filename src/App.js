import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Etape1 from './Components/Etape1';
import Questions from './Components/Questions';
import Divergence from './Components/Divergence';
import Notation from './Components/Notation';

function App() {
  return (
    <div>
      <header>
      <NavBar/>
      <Notation/>
      </header>

    </div>
  );
}

export default App;
