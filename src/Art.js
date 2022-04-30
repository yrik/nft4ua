import React from 'react';
import Images from './art/art.json';

const Art = (props) => {
  return (
    <div className="prose text-center m-auto mt-5 px-5">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mx-auto">
        {Images.map(([path, name]) => (
          <div className="w-full rounded mx-auto" key={img}>
            <img
              className="rounded"
              style={{
                minWidth: '300px',
                width: '300px',
                height: '300px',
                display: 'inline-block',
              }}
              src={`${process.env.PUBLIC_URL}/art-dest/${path}`}
            />
            <div
              className="mx-auto"
              style={{
                width: '300px',
                marginTop: '-35px',
                backgroundColor: '#808080',
                color: 'white',
                borderRadius: '0px 0px 5px 5px',
              }}
            >
              {name}
            </div>{' '}
          </div>
        ))}
      </div>

      <a href="/" className="mt-10 btn btn-outline btn-secondary">
        Back to Main
      </a>
    </div>
  );
};
export default Art;
