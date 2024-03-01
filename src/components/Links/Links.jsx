import {memo, useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchLinks } from "../../store/asyncThunks/fetchLinks";

import style from './Links.module.scss';

const linksArr = [
  {id: 'imdb_id', linkBase: 'https://www.imdb.com/', name: 'IMDB'},
  {id: 'facebook_id', linkBase: 'https://www.facebook.com/', name: 'Facebook'},
  {id: 'instagram_id', linkBase: 'https://www.instagram.com/', name: 'Instagram'},
  {id: 'twitter_id', linkBase: 'https://twitter.com/', name: 'Twitter'},
]

const Links = memo(({category, homepage, borderBottom}) => {
  const {res} = useSelector(state => state.links)
  const dispatch = useDispatch();
  
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchLinks({category, id}))
  }, [dispatch, category, id]);

  const renderLinks = useCallback((id, linkBase, linkKey, name) => {
    if (res?.[`${id}`]) {
      const isPerson = category === 'person';
      const imdb = id === 'imdb_id';
      const baseUrl = imdb && isPerson ? linkBase + 'name/' : imdb && !isPerson ? linkBase + 'Title/' : linkBase;

      return (
        <a key={id} className={style.link} href={`${baseUrl}${linkKey}`} rel="noopener noreferrer" target='__blank'>
          {name}
        </a>
      )
    }
  }, [category, res]);
  
  return (
    <>
      {
        res &&
          <div className={`${style.wrapp} ${borderBottom && style.borderBottom}`}>
            <h4>Links</h4>

            <div className={style.wrapp__box}>
              {
                homepage &&
                  <a href={homepage} rel="noopener noreferrer" target='__blank'>Homepage</a>
              }

              {linksArr.map(({id, linkBase, name}) => (
                renderLinks(id, linkBase, res[`${id}`], name)
              ))}
            </div>
          </div>
      }
    </>
  );
})

export default Links;