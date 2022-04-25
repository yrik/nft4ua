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

      <form>
        <div class="relative z-0 mb-6 w-full group">
          <select class="select select-primary w-full max-w-xs">
            <option>1 Painting for 0.1 Ether</option>
            <option>3 Paintings for 0.25 Ether</option>
            <option>5 Paintings for 0.35 Ether</option>
            <option>I just want to support 0.5 Ether</option>
          </select>
        </div>
        <button class="btn btn-primary">Donate & Receive NFT</button>
      </form>

      <button class="mt-3 btn btn-outline btn-secondary">Browse Art</button>
    </div>
  );
};
export default App;
