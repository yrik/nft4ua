import React from 'react';
import preview from './assets/girl-with-painting.jpeg';

const App = (props) => {
  return (
    <div className="prose text-center m-auto mt-5 px-5">
      <h1>NFT collection featuring art of kids of Ukraine</h1>
      <div>
        All funds go to Prytula Foundation, used to buy drones make sky safe for
        UA kids
      </div>
      <img
        src={preview}
        alt="Kids of ukraine made art to raise money to protect the sky"
        style={{ width: '250px' }}
        className="m-auto mb-5 mt-2"
      />
      <button class="btn btn-outline btn-secondary">Browse Art</button>
    </div>
  );
};
export default App;
