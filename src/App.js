import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Header from './components/header/Header';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import WatchListPage from './pages/watchListPage/WatchListPage';
import MoviesPage from './pages/moviesPage/MoviesPage';
import MovieDetails from './pages/movieDetails/MovieDetails';
import TvSeriesPage from './pages/tvSeriesPage/TvSeriesPage';
import CelebsPage from './pages/celebsPage/CelebsPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import Footer from './components/footer/Footer';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-wrapp">
          <Routes>
            <Route path='/'element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/watch_list' element={<WatchListPage />} />
            <Route path='/movie/:filter/:page' element={<MoviesPage />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/tv/:filter/:page' element={<TvSeriesPage />} />
            <Route path='/person/:page' element={<CelebsPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
