// SPDX-License-Identifier: MIT
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
}