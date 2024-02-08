import { useRoutes } from "react-router-dom";

import LoginPage from '../pages/loginPage/LoginPage';
import HomePage from '../pages/homePage/HomePage';
import WatchListPage from '../pages/watchListPage/WatchListPage';
import MoviesPage from '../pages/moviesPage/MoviesPage';
import MovieDetailsPage from '../pages/movieDetailsPage/MovieDetailsPage';
import GallaryModalPage from '../pages/galleryModalPage/GalleryModalPage';
import TvSeriesPage from '../pages/tvSeriesPage/TvSeriesPage';
import TvSeriesDetailsPage from "../pages/tvSeriesDetailsPage/TvSeriesDetailsPage";
import CelebsPage from '../pages/celebsPage/CelebsPage';
import TvSeasonsDetailsPage from "../pages/tvSeasonsDetailsPage/TvSeasonsDetailsPage";
import TvEpisodesDetailsPage from "../pages/tvEpisodesDetailsPage/TvEpisodesDetailsPage";
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import SearchPage from "../pages/searchPage/SearchPage";
import DiscoverPage from "../pages/discoverPage/DiscoverPage";
import CelebDetailsPage from "../pages/celebDetailsPage/CelebDetailsPage";

const Router = () => {
  return useRoutes([
    { path: '/', element: <HomePage /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'watch_list', element: <WatchListPage /> },
    { path: '*', element: <NotFoundPage /> },
    { 
      path: 'person',
      children: [
        { index: true },
        { path: ':filter/:page', element: <CelebsPage /> },
        { 
          path: ':id', 
          children: [
            { index: true, element: <CelebDetailsPage/> },
            { path: 'gallery/:modal',element: <GallaryModalPage/> }
          ]
        },
      ]
    },
    { 
      path: 'movie',
      children: [
        { index: true },
        { path: ':filter/:page', element: <MoviesPage/> },
        { 
          path: ':id', 
          children: [
            { index: true, element: <MovieDetailsPage/> },
            { path: 'gallery/:modal',element: <GallaryModalPage/> }
          ]
        },
      ]
    },
    { 
      path: 'tv',
      children: [
        { index: true },
        { path: ':filter/:page', element: <TvSeriesPage/> },
        { 
          path: ':id', 
          children: [
            { index: true, element: <TvSeriesDetailsPage/> },
            { path: 'gallery/:modal',element: <GallaryModalPage/> },
            { 
              path: 'seasons/:season',
              children: [
                { index: true, element: <TvSeasonsDetailsPage/> },
                { path: 'gallery/:modal', element: <GallaryModalPage/> },
                {
                  path: 'episodes/:episode',
                  children: [
                    { index: true, element: <TvEpisodesDetailsPage/> },
                    { path: 'gallery/:modal', element: <GallaryModalPage/> },
                  ]
                }
              ]
            }
          ]
        },
      ]
    },
    {
      path: 'search',
      children: [
        { index: true },
        { path: ':category/:value/:page', element: <SearchPage /> }
      ]
    },
    {
      path: 'discover',
      children: [
        { index: true },
        { path: ':category/:filters/:page', element: <DiscoverPage /> }
      ]
    }
  ])
}

export default Router;