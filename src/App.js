import {HashRouter} from 'react-router-dom';

import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer'

import Router from './routes/Router';

import './App.scss';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <div className="App-wrapp">
          <Router />
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
