// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandToken is ERC721, Ownable {
    uint256 public nextTokenId;

    struct LandDetails {
        string location;
        uint256 area;
        string propertyType;
        string ownerHistory;
    }

    // Mapping from token ID to LandDetails
    mapping(uint256 => LandDetails) public lands;

    constructor() ERC721("LandToken", "LTK") Ownable(msg.sender) {
        // Your constructor logic here
    }

    // Mint a new land token with specific details
    function mintLand(
        string memory location,
        uint256 area,
        string memory propertyType,
        string memory ownerHistory
    ) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);

        // Set the land details
        lands[tokenId] = LandDetails(location, area, propertyType, ownerHistory);
        
        nextTokenId++;
    }

    // Function to transfer land ownership
    function transferLand(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        _transfer(msg.sender, to, tokenId);
    }

    // Function to view land details
    function getLandDetails(uint256 tokenId) public view returns (LandDetails memory) {
        return lands[tokenId];
    }
}
