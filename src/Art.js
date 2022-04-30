import React from 'react';
import Images from './art/art.json';

const Art = (props) => {
  return (
    <div className="prose text-center m-auto mt-5 px-5">
      {Images.map((img) => (
        <img src={`${process.env.PUBLIC_URL}/art-dest/${img}`} />
      ))}

      <a href="/" className="mt-10 btn btn-outline btn-secondary">
        Back to Main
      </a>
    </div>
  );
};
export default Art;
