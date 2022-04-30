import React from 'react';

import Preview from './assets/girl-with-painting.jpeg';

import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

import Faq from 'react-faq-component';

const INFURA_KEY = 'asd';
const INFURA_ID = 'asdf';

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1', // chain ID must be in hexadecimel
      token: 'ETH', // main chain token
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/f166e893a30a4b8a9d7f41de03112fa8`, // rpcURL required for wallet balances
    },
  ],
  appMetadata: {
    name: 'NFT for Ukraine Today',
    icon: '<SVG_ICON_STRING>',
    logo: '<SVG_LOGO_STRING>',
    description: 'Kids of ukraine made art to raise money to protect the sk',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
});

async function initWallet() {
  const wallets = await onboard.connectWallet();
  console.log(wallets);
}

const faqData = {
  title: 'FAQ',
  rows: [
    {
      title: 'When is the release?',
      content: 'May 2022',
    },
    {
      title: 'Who made the Art?',
      content:
        'Kids of Ukraine. We cooperate with refugee centers and multiple schools in Ukraine.',
    },
    {
      title: 'What is the price?',
      content: 'You can specify any price starting from 0.1 ether per NFT',
    },
    {
      title: 'Where do profits and royalties go?',
      content:
        '95% goes directly to the official wallet of Prytula Foundation. 5% is withholded to expand and maintain this project (deployments, promotions, design, etc)',
    },
    {
      title: 'Are you a government organization?',
      content:
        'We are not a government organization, however, we are supported by the ministry of digital transformation of Ukraine.',
    },
  ],
};

const Landing = (props) => {
  return (
    <div className="prose text-center m-auto mt-5 px-5">
      <h1>NFT collection featuring art of kids of Ukraine</h1>
      <div>
        All funds go to{' '}
        <a
          style={{
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 'inherit',
          }}
          target="_blank"
          href="https://prytulafoundation.org/en"
        >
          Prytula Foundation
        </a>
        , used to buy drones to make sky safe for UA kids
      </div>
      <img
        src={Preview}
        alt="Kids of ukraine made art to raise money to protect the sky"
        style={{ width: '250px' }}
        className="m-auto mb-5 mt-2"
      />

      <div>
        <select
          className="select select-primary mb-2"
          style={{ width: '250px' }}
        >
          <option>1 Painting for 0.1 Ether</option>
          <option>3 Paintings for 0.25 Ether</option>
          <option>5 Paintings for 0.35 Ether</option>
          <option>I just want to support</option>
        </select>
        <br />
        <button
          className="btn btn-primary"
          disabled="disabled"
          onClick={(e) => initWallet()}
          style={{ width: '250px' }}
        >
          Donate & Receive NFT
        </button>
      </div>

      <a href="/art" className="mt-10 btn btn-outline btn-secondary">
        Browse Art
      </a>

      <div className="mt-16 text-left">
        <Faq
          data={faqData}
          styles={{ rowTitleColor: 'grey', titleTextColor: 'grey' }}
          config={{}}
        />
      </div>
    </div>
  );
};
export default Landing;
