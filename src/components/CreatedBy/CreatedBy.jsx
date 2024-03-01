import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../constants/api";
import style from './CreatedBy.module.scss';

const CreatedBy = ({createdBy}) => {
  return (
    <>
      {
        Boolean(createdBy?.length) &&
        <div className={style.wrapp}>
          <h4>Created by</h4>

          <ul>
            {createdBy?.map(({id, name, profile_path}) => (
              <li key={id}>
                {
                  profile_path && <img src={`${IMAGE_URL}w45/${profile_path}`} alt={`${name}`} />
                }

                <Link to={`/person/${id}`}>{ name }</Link>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  );
};

export default CreatedBy;