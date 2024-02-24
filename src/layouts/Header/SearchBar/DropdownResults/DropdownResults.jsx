import {useSelector} from "react-redux";
import {useCallback, memo} from "react";

import Loading from "../../../../components/loading/Loading";
import Error from "../../../../components/error/Error";
import SearchCard from "../../../../components/searchCard/SearchCard";
import {Link, useNavigate} from "react-router-dom";

import style from './DropdownResults.module.scss'

const DropdownResults = memo(({value, setValue, openSearch, selectedOption, optionCategory}) => {
  const { status, res } = useSelector(state => state.searchBar);

  const navigate = useNavigate();

  const resultsClass = `${style.results} ${openSearch && style.results_open}`;
  const SearchCardCategory = selectedOption !== 'All' && selectedOption.slice(0, -1);

  const handleNavigate = useCallback(({media_type, id}) => {
    setValue('')
    navigate(`/${media_type ? media_type : optionCategory}/${id}`);
  }, [setValue, navigate, optionCategory]);

  return (
    <div className={resultsClass}>
      {value && !res && <Loading/>}
      {status && <Error status={status}/>}

      {
        value && res &&
          <ul>
            {res?.results?.map((props) => {
              const {id, media_type} = props;

              return (
                <li key={id} onClick={() => handleNavigate({id, media_type})}>
                  <SearchCard {...props} category={SearchCardCategory}/>
                </li>
              )
            })}
          </ul>
      }

      {
        Boolean(res?.results?.length) && optionCategory !== 'multi' &&
        <Link
          className={style.see_all}
          to={`/search/${optionCategory}/${value}/1`}
          onClick={() => setValue('')}
        >
          See all results →
        </Link>
      }

      {
        res?.results?.length === 0 &&
          <div className={style.no_res}>
            No results found for "{value}"
          </div>
      }
    </div>
  );
});

export default DropdownResults;