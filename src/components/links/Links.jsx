import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchLinks } from "../../store/asyncThunks/fetchLinks";

import style from './links.module.scss';

const linksArr = [
  {id: 'imdb_id', linkBase: 'https://www.imdb.com/', name: 'IMDB'},
  {id: 'facebook_id', linkBase: 'https://www.facebook.com/', name: 'Facebook'},
  {id: 'instagram_id', linkBase: 'https://www.instagram.com/', name: 'Instagram'},
  {id: 'twitter_id', linkBase: 'https://twitter.com/', name: 'Twitter'},
]

const Links = ({category, homepage}) => {
  const {res} = useSelector(state => state.links)
  const dispatch = useDispatch();
  
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchLinks({category, id}))
  }, [dispatch, category, id]);

  const renderLinks = (id, linkBase, linkKey, name) => {
    if (res[`${id}`]) {
      const isPerson = category === 'person';
      const imdb = id === 'imdb_id';
      const baseUrl = imdb && isPerson ? linkBase + 'name/' : imdb && !isPerson ? linkBase + 'Title/' : linkBase;

      return (
        <a key={id} className={style.link} href={`${baseUrl}${linkKey}`} rel="noopener noreferrer" target='__blank'>
          {name}
        </a>
      )
    }
  }
  
  return (
    <>
      {
        res &&
          <>
            {
              homepage && 
                <a className={style.link} href={homepage} rel="noopener noreferrer" target='__blank'>
                  Official Site
                </a>
            }
            {linksArr.map(({id, linkBase, name}) => (
              renderLinks(id, linkBase, res[`${id}`], name)
            ))}
          </>
      }
    </>
  );
}

export default Links;