pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VibeNFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    using Strings for uint256;

    // Vibe type mapping
    mapping(uint256 => string) private _vibeTypes;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Events
    event VibeMinted(address indexed to, uint256 indexed tokenId, string vibeType);
    event BaseURIUpdated(string newBaseURI);

    constructor() ERC721("OnchainVibeCheck", "VIBE") Ownable(msg.sender) {}

    function mintVibe(address to, string memory uri, string memory vibeType) public returns (uint256) {
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _vibeTypes[tokenId] = vibeType;
        
        emit VibeMinted(to, tokenId, vibeType);
        
        return tokenId;
    }

    function getVibeType(uint256 tokenId) public view returns (string memory) {
        _requireMinted(tokenId);
        return _vibeTypes[tokenId];
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
        emit BaseURIUpdated(baseURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
