import { useRoutes } from "react-router-dom";

import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/HomePage/HomePage';
import WatchListPage from '../pages/watchListPage/WatchListPage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import GalleryModalPage from '../pages/GalleryModalPage/GalleryModalPage';
import TvSeriesPage from '../pages/TvSeriesPage/TvSeriesPage';
import TvSeriesDetailsPage from "../pages/TvSeriesDetailsPage/TvSeriesDetailsPage";
import CelebsPage from '../pages/CelebsPage/CelebsPage';
import TvSeasonsDetailsPage from "../pages/tvSeasonsDetailsPage/TvSeasonsDetailsPage";
import TvEpisodesDetailsPage from "../pages/tvEpisodesDetailsPage/TvEpisodesDetailsPage";
import NotFoundPage from '../pages/NotFoundSvg/NotFoundPage';
import SearchPage from "../pages/SearchPage/SearchPage";
import DiscoverPage from "../pages/DiscoverPage/DiscoverPage";
import CelebDetailsPage from "../pages/CelebDetailsPage/CelebDetailsPage";

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
            { path: 'gallery/:modal',element: <GalleryModalPage/> }
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
            { path: 'gallery/:modal',element: <GalleryModalPage/> }
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
            { path: 'gallery/:modal',element: <GalleryModalPage/> },
            { 
              path: 'seasons/:season',
              children: [
                { index: true, element: <TvSeasonsDetailsPage/> },
                { path: 'gallery/:modal', element: <GalleryModalPage/> },
                {
                  path: 'episodes/:episode',
                  children: [
                    { index: true, element: <TvEpisodesDetailsPage/> },
                    { path: 'gallery/:modal', element: <GalleryModalPage/> },
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