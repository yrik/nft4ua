import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import gnosisModule from '@web3-onboard/gnosis';
import walletConnectModule from '@web3-onboard/walletconnect';

const injected = injectedModule();

const provider = 'alchemy';
const providersConfig = {
  alchemy: {
    mumbai: {
      URL: 'https://polygon-mumbai.g.alchemy.com/v2/Omk4TvEUaQ6m5EzeIT-5ZHJcYIyxbZvT',
    },
    /*
    polygon: {
      URL: 'https://polygon-mainnet.g.alchemy.com/v2/hZEjjMbAlUpHO5PWLDrfCl_ba6a3ZTWi',
    },*/
  },
};

const logo = `
<svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
</svg>
`;

const gnosis = gnosisModule();
const walletConnect = walletConnectModule();

export const chains = [
  /*
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon',
    rpcUrl: providersConfig[provider]['polygon']['URL'],
  },*/
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'PolygonMumbai',
    rpcUrl: providersConfig[provider]['mumbai']['URL'],
  },
];

export const onboard = Onboard({
  wallets: [injected, gnosis, walletConnect],
  chains: chains,
  appMetadata: {
    name: 'NFT 4 Ukraine',
    icon: logo,
    logo: logo,
    description: 'NFT ART 4 Ukraine',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
});

export const addresses = {
  // polygon
  '0x89': '0x37af8Ff206D7D7e85B3dED055F7B8082dAc22067',
  // mumbai
  '0x13881': '0x37af8Ff206D7D7e85B3dED055F7B8082dAc22067',
};

export async function connectWallet() {
  const wallets = await onboard.connectWallet();
  return wallets[0];
}

export async function saveWalletOnChange(setWallet) {
  const walletsSub = onboard.state.select('wallets');

  const { unsubscribe } = walletsSub.subscribe((wallets) => {
    const connectedWallets = wallets.map(({ label }) => label);
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWallets)
    );
    setWallet(wallets[0]);
  });

  return unsubscribe;
}

export async function loadWallet() {
  const previouslyConnectedWallets = JSON.parse(
    window.localStorage.getItem('connectedWallets')
  );

  if (previouslyConnectedWallets && previouslyConnectedWallets[0]) {
    return await onboard.connectWallet({
      autoSelect: { label: previouslyConnectedWallets[0], disableModals: true },
    });
  }
}
