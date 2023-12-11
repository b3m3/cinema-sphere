import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Header from './components/header/Header';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import Footer from './components/footer/Footer';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
            <div className="App-wrapp">
              <div className="container">
                  <Routes>
                    <Route path='/'element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                  </Routes>
              </div>
            </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
