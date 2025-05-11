// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library VibeAnalyzer {
    struct VibeData {
        uint256 emojiCount;
        uint256 technicalPostCount;
        uint256 socialInteractions;
        uint256 tradingVolume;
        uint256 holdingPeriod;
        uint256 uniqueTokens;
    }

    function analyzeVibe(VibeData memory data) public pure returns (string memory) {
        uint256 memeScore = calculateMemeScore(data);
        uint256 builderScore = calculateBuilderScore(data);
        uint256 maximalistScore = calculateMaximalistScore(data);
        uint256 degenerateScore = calculateDegenerateScore(data);

        uint256 highestScore = max4(
            memeScore,
            builderScore,
            maximalistScore,
            degenerateScore
        );

        if (highestScore == memeScore) return "meme-oracle";
        if (highestScore == builderScore) return "builder";
        if (highestScore == maximalistScore) return "maximalist";
        return "degenerate";
    }

    function calculateMemeScore(VibeData memory data) private pure returns (uint256) {
        return data.emojiCount * 2 + data.socialInteractions;
    }

    function calculateBuilderScore(VibeData memory data) private pure returns (uint256) {
        return data.technicalPostCount * 3 + data.holdingPeriod;
    }

    function calculateMaximalistScore(VibeData memory data) private pure returns (uint256) {
        return data.holdingPeriod * 2 + (1000 / (data.uniqueTokens + 1));
    }

    function calculateDegenerateScore(VibeData memory data) private pure returns (uint256) {
        return data.tradingVolume + data.uniqueTokens * 2;
    }

    function max4(
        uint256 a,
        uint256 b,
        uint256 c,
        uint256 d
    ) private pure returns (uint256) {
        return max2(max2(a, b), max2(c, d));
    }

    function max2(uint256 a, uint256 b) private pure returns (uint256) {
        return a >= b ? a : b;
    }
}