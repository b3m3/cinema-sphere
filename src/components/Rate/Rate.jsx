import { useState } from "react";
import { useSelector } from 'react-redux';

import Modal from "./Modal/Modal";
import BodyUi from "./BodyUi/BodyUi";

const Rate = ({category, id, title}) => {
  const [isShow, setIsShow] = useState(false);
  const [starSelected, setStarSelected] = useState('');
  const [starHover, setStarHover] = useState('');

  const { error, status, loading } = useSelector(state => state.rate.post);

  return (
    <div>
      <BodyUi
        id={id}
        setIsShow={setIsShow}
        category={category}
        starSelected={starSelected}
        setStarHover={setStarHover}
        setStarSelected={setStarSelected}
        error={error}
        status={status}
      />

      {
        isShow &&
          <Modal
            id={id}
            category={category}
            starSelected={starSelected}
            starHover={starHover}
            isShow={isShow}
            setStarHover={setStarHover}
            setStarSelected={setStarSelected}
            title={title}
            setIsShow={setIsShow}
            error={error}
            status={status}
            loading={loading}
          />
      }
    </div>
  );
}

export default Rate;