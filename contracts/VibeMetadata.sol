pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

library VibeMetadata {
    using Strings for uint256;

    struct VibeAttributes {
        string vibeType;
        string[] badges;
        uint256 vibeScore;
        uint256 mintTimestamp;
    }

    function generateMetadata(
        uint256 tokenId,
        VibeAttributes memory attributes
    ) public pure returns (string memory) {
        bytes memory metadata = abi.encodePacked(
            '{"name": "Vibe Check #',
            tokenId.toString(),
            '", "description": "Onchain Vibe Check NFT - ',
            attributes.vibeType,
            '", "attributes": [',
            generateAttributes(attributes),
            ']}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(metadata)
            )
        );
    }

    function generateAttributes(VibeAttributes memory attrs) private pure returns (bytes memory) {
        bytes memory badgeString = generateBadgeString(attrs.badges);
        
        return abi.encodePacked(
            '{"trait_type": "Vibe Type", "value": "',
            attrs.vibeType,
            '"}, {"trait_type": "Vibe Score", "value": ',
            attrs.vibeScore.toString(),
            '}, {"trait_type": "Mint Timestamp", "value": ',
            attrs.mintTimestamp.toString(),
            '}, {"trait_type": "Badges", "value": ',
            badgeString,
            '}'
        );
    }

    function generateBadgeString(string[] memory badges) private pure returns (bytes memory) {
        if (badges.length == 0) {
            return '[]';
        }

        bytes memory badgeString = '[';
        for (uint i = 0; i < badges.length; i++) {
            if (i > 0) {
                badgeString = abi.encodePacked(badgeString, ',');
            }
            badgeString = abi.encodePacked(badgeString, '"', badges[i], '"');
        }
        badgeString = abi.encodePacked(badgeString, ']');

        return badgeString;
    }

    function generateOnChainMetadata(
        uint256 tokenId,
        VibeAttributes memory attributes
    ) public pure returns (string memory) {
        bytes memory metadata = abi.encodePacked(
            '{"name": "Vibe Check #',
            tokenId.toString(),
            '", "description": "Onchain Vibe Check NFT - ',
            attributes.vibeType,
            '", "attributes": [',
            generateAttributes(attributes),
            '], "image": "data:image/svg+xml;base64,',
            Base64.encode(generateSVGImage(attributes)),
            '"}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(metadata)
            )
        );
    }

    function generateSVGImage(VibeAttributes memory attributes) private pure returns (bytes memory) {
        return abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="10" y="20" class="base">Vibe Type: ', attributes.vibeType, '</text>',
            '<text x="10" y="40" class="base">Vibe Score: ', attributes.vibeScore.toString(), '</text>',
            '<text x="10" y="60" class="base">Mint Timestamp: ', attributes.mintTimestamp.toString(), '</text>',
            '<text x="10" y="80" class="base">Badges: ', generateBadgeString(attributes.badges), '</text>',
            '</svg>'
        );
    }
}
