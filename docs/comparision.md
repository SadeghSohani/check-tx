# Comparision between Blockchain API providers
## Compare between alchemy and infura (web3 APIs)
### Supported blockchains
Infura supports Ethereum, Polygan, Aribtrum, Optimism, Avalanche and BSC.
Alchemy supports Ethereum, Polygan, Aribtrum, Optimism, Avalanche, BSC, Solana, Fantom ans xDai.
### Free tier
Infura provides 3 million free requests per month (100,000 Total Requests/Day and 10 Requests/Second)

Alchemy provides up to 10,000 requests per day.
### Pricing
Infura: Pay-as-you-go based on requests (50$ up to 225$ per month).

Alchemy: Pay-as-you-go based on compute units (includes various API calls) (49$ up to 199$ per month)
### Reliability
Infura: Generally reliable, but has experienced outages in the past.

Alchemy: Claims higher average reliability.
### Data Accuracy
Infura: Does not guarantee 100% data accuracy.

Alchemy: Offers 100% data accuracy guarantee.
### Enhanced APIs
Infura: Offers basic APIs for interacting with blockchains.

Alchemy: Provides a wider range of developer-friendly APIs (NFTs, DeFi, etc.).
### Customer Support
Infura: Free support only available for paid plans.

Alchemy: Offers support for all tiers.
### Conclusion
It seems that Infura is good for beginners and low traffic projects and Alchemy is more suitable for projects reuiring high reliability and data accuracy. Moreover, for procjects working with Solan and other non-EVM blockchains is the only option.
## Block explorers APIs
### Supported blockchains
Each blockchain has its block explorer. Here we compare [Etherscan.io](https://etherscan.io/) and [bscscan.com](https://bscscan.com)
### Free tier
Both of etherscan and bscscan provide free tier with this characteristics:

- 5 call per second limit
- Up to 100,000 API calls per day
- Just community support

For more details about pricing plans:
- [etherscan.io/apis](https://etherscan.io/apis) (199$ up to 899$ per month)
- [bscscan.com/apis](https://bscscan.com/apis)(199$ up to 399$ per month)
### API PRO
Both of them provide some advances APIs that required buy a pricing plan.

API PRO endpoints  are only available on the Ethereum mainnet, and are not available to any testnet explorers.

Among the endpoints available exclusively to API PRO include:
- Get Token Info by ContractAddress
- Get Ethereum Daily Total Gas Used
- Get Historical ERC20-Token Account Balance for TokenContractAddress by BlockNo
- Get Historical Ether Balance for a single Address By BlockNo