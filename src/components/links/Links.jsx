import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchLinks } from '../../store/slices/fetchDataSlice';

import { LiaExternalLinkAltSolid } from "react-icons/lia";

import style from './links.module.scss';

const linksArr = [
  {id: 'imdb_id', linkBase: 'https://www.imdb.com/title/', name: 'IMDB'},
  {id: 'facebook_id', linkBase: 'https://www.facebook.com/', name: 'Facebook'},
  {id: 'instagram_id', linkBase: 'https://www.instagram.com/', name: 'Instagram'},
  {id: 'twitter_id', linkBase: 'https://twitter.com/', name: 'Twitter'},
]

const Links = ({category, id, homepage}) => {
  const {links} = useSelector(state => state.links)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLinks({category, id}))
  }, [dispatch, category, id]);

  const renderLinks = (id, linkBase, linkKey, name) => {
    if (links.res[`${id}`]) {
      return (
        <a key={id} className={style.link} href={`${linkBase}${linkKey}`} rel="noopener noreferrer" target='__blank'>
          {name}
          <LiaExternalLinkAltSolid />
        </a>
      )
    }
  }

  return (
    <>
      {
        links.res &&
        <>
          {
            homepage && 
              <a className={style.link} href={homepage} rel="noopener noreferrer" target='__blank'>
                Official Site
                <LiaExternalLinkAltSolid />
              </a>
          }
          {linksArr.map(({id, linkBase, name}) => (
            renderLinks(id, linkBase, links.res[`${id}`], name)
          ))}
        </>
      }
    </>
  );
}

export default Links;