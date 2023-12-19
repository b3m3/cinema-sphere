import {BrowserRouter} from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Router from './routes/Router';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-wrapp">
          <Router />
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
