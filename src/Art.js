import React, { useEffect, useState } from 'react';

import Images from './art/art.json';
import * as Crypto from './crypto.js';
import * as ethers from 'ethers';
import ContractAbi from './abi.json';

const ContractAddress = '';

const Art = (props) => {
  const [wallet, setWallet] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  const connectWallet = async () => {
    const wallet = await Crypto.connectWallet();
    setWallet(wallet);
  };

  useEffect(() => {
    Crypto.loadWallet();
    return Crypto.saveWalletOnChange(setWallet);
  }, []);

  useEffect(() => {
    async function init() {
      if (wallet) {
        const provider = new ethers.providers.Web3Provider(
          wallet.provider,
          'any'
        );
        const signer = provider.getUncheckedSigner();
        const contract = new ethers.Contract(
          ContractAddress,
          ContractAbi,
          signer
        );
        setContract(contract);
      } else {
        setContract(contract);
      }
    }
    init();
  }, [wallet]);

  return (
    <div className="prose text-center m-auto mt-5 px-5">
      <div>
        {!wallet && (
          <button className="btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mx-auto">
        {Images.map(([path, name]) => (
          <div className="w-full rounded mx-auto" key={path}>
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
