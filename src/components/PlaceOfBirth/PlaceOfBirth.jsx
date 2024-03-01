import React from 'react';

const PlaceOfBirth = ({place_of_birth}) => {
  return (
    <>
      { place_of_birth && <p>{ place_of_birth }</p> }
    </>
  );
};

export default PlaceOfBirth;