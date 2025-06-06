# Onchain Vibe Check Smart Contracts

This directory contains the smart contracts for the Onchain Vibe Check project.

## Contracts

### VibeNFT.sol
The main NFT contract that handles minting and storing vibe cards. Features:
- ERC721 compliant with URI storage and enumerable extensions
- Stores vibe types for each token
- Configurable base URI for metadata
- Owner-only administrative functions

### VibeMetadata.sol
Library for generating on-chain metadata for vibe cards. Features:
- Base64 encoded JSON metadata
- Dynamic attribute generation
- Support for badges and vibe scores

### VibeAnalyzer.sol
Library for analyzing user data and determining vibe types. Features:
- Scoring system for different vibe categories
- Analysis of social and trading metrics
- Deterministic vibe type assignment

## Deployment

To deploy these contracts on Base mainnet and Base testnet:

1. Set up your deployment environment with Base RPC URL and private key
2. Deploy VibeNFT.sol first (it will automatically deploy the libraries)
3. Verify the contract on Basescan
4. Set the base URI for metadata if using IPFS/Arweave

## Contract Addresses

- Base Mainnet: [Not yet deployed]
- Base Testnet: [Not yet deployed]

## Crypto-Related Terms

- **Ethereum**: A decentralized platform that runs smart contracts.
- **ERC721**: A standard for representing ownership of non-fungible tokens (NFTs).
- **Base**: A fast, low-cost Ethereum L2 to make minting smooth and scalable.
- **IPFS**: InterPlanetary File System, a protocol for storing and sharing data in a distributed file system.
- **Arweave**: A decentralized storage network that provides a platform for the permanent storage of data.
- **Basescan**: A blockchain explorer for the Base network.

## New Functionality

We have added new functionality to enhance the Onchain Vibe Check project. This includes:

- **Vibe Analysis**: Analyze user data to determine their vibe type based on various metrics.
- **Metadata Generation**: Generate on-chain metadata for vibe cards, including dynamic attributes and badges.
- **Minting on Base**: Mint vibe cards as NFTs on the Base mainnet and testnet.
- **Optimized for Base**: Ensure low-gas minting and smooth scalability on the Base network.
