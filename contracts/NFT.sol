// SPDX-License-Identifier: MIT
// Contract Author: https://github.com/yrik
// For: https://nft4ukraine.today project

pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./ContextMixin.sol";
import "./NativeMetaTransaction.sol";


contract NFT4UkraineToday is ERC721, Ownable {

    // official wallet of Prytula Foundation from https://prytulafoundation.org/en
    address constant RECEIVER = 0x858fa9c4De5f7A0e7d6EACB671C3482665A543B2;
    address proxyRegistryAddress;

    uint256 public basePrice = 0.1 ether;
    bool public saleOpen = false;
    string public baseTokenURI = "https://nft4ukraine.today/api/";

    uint256 _counter;

    constructor(address _proxyRegistryAddress) ERC721("NFT For Ukraine", "NFT4UKRAINE") {
      proxyRegistryAddress = _proxyRegistryAddress;
    }

    function setBasePrice(uint256 price) public onlyOwner {
        basePrice = price; 
    }

    function setSale(bool open) public onlyOwner {
        saleOpen = open;
    }

    function setBaseURI(string calldata URI) public onlyOwner {
        baseTokenURI = URI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function totalSupply() public view virtual returns (uint256 supply)
    {
        return _counter;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(RECEIVER).transfer(balance *  9 / 10);
        // 10% kept for project funding: deployment cost, promotions, etc 
        payable(owner()).transfer(balance * 1 / 10);
    }

    function cost(uint256 amount) public view returns (uint256) {
      if (amount == 1) {
        return basePrice;
      }
      if (amount == 2) {
        return basePrice * 2;
      }
      if (amount == 3) {
        return basePrice * 3 * 8 / 10;
      }
      if (amount == 4) {
        return basePrice * 4 * 8 / 10;
      }      
      if (amount == 5) {
        return basePrice * 5 * 7 / 10;
      } 
      return   basePrice * amount * 7 / 10;
    }

    function mint(uint256 amount) public payable {
        require(saleOpen, "Sale is not open");
        require(msg.value > cost(amount), "Not enough ETH sent");

        unchecked {
            uint256 id = _counter;
            _counter += amount;
            for (uint256 i = 0; i < amount; i++) {
                id++;
                _mint(msg.sender, id);
            }
        }
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        // whitelist OpenSea proxy contract for easy trading.
        if (proxyRegistryAddress != address(0x0)) {
          ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
          if (address(proxyRegistry.proxies(owner)) == operator) {
              return true;
          }
        }

        return super.isApprovedForAll(owner, operator);
    }
}