// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VibeNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to vibe type
    mapping(uint256 => string) private _vibeTypes;
    
    // Events
    event VibeMinted(address indexed to, uint256 indexed tokenId, string vibeType);

    constructor() ERC721("OnchainVibeCheck", "VIBE") {}

    function mintVibe(address to, string memory uri, string memory vibeType) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _vibeTypes[tokenId] = vibeType;
        
        emit VibeMinted(to, tokenId, vibeType);
        
        return tokenId;
    }
    
    function getVibeType(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "VibeNFT: Query for nonexistent token");
        return _vibeTypes[tokenId];
    }

    // The following functions are overrides required by Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}