const ContractPowNFT = artifacts.require("marketPlace");
//const PowToken = artifacts.require("POWToken");
const { expect } = require('chai');
const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const time = require("./helpers/time");
var chai = require('chai');
var bnChai = require('bn-chai');
chai.use(bnChai(BN));



contract("Contract Pow NFT", accounts => {

	const _name = "powUniq";
	const _symbol = "POW";
	const _owner = accounts[0];
	const _player1 = accounts[1];
	const _player2 = accounts[2];
	const _player3 = accounts[3];
	const _item = "Tour eiffel";
	const _stone = "Pepite or";
	const _monument = new BN(1);
    const _material = new BN(2);
  	const _card = new BN(3);
  	const _initialSupply = new BN(3125000);

	beforeEach(async ()=> {
		//PowTokenInstance = await PowToken.new(new BN(200), _initialSupply);
		ContractPowNFTInstance = await ContractPowNFT.new();
	});

	xit("Test connection: Return  1 ", async () =>{
		let number = new BN(1);
		expect(await ContractPowNFTInstance.get.call()).to.be.bignumber.equal(number);		
	});

	context ("Test : ERC 721", async () => {

		it("has a name", async () =>{
			expect(await ContractPowNFTInstance.name()).to.equal(_name);		
		});

		it("has a symbol", async () =>{
			expect(await ContractPowNFTInstance.symbol()).to.equal(_symbol);
		});

		it("create an item and put it in the data base", async () =>{
		
			let _balance = new BN(1);
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			expect(await ContractPowNFTInstance.balanceOf(_owner)).to.be.bignumber.equal(_balance);
			expect(await ContractPowNFTInstance.ownerOf(0)).to.equal(_owner);
		});
	})

	context ("Test : The Item factory", async () => {

		context ("Create tour eiffel in paper" , async () => {

			xit("1st step : Create the monument Tour eiffel (code 294)", async () => {

				let targetedComposition = new BN(294);
				const valeur = await ContractPowNFTInstance.createItem.call(_monument, _item, 5, {from: _owner});
				expect(valeur).to.be.bignumber.equal(targetedComposition);
			})

			xit("2nd step : Create the base composition of the monument Tour eiffel in paper (code 294509)", async () => {

				let targetedComposition = new BN(294509);
				const valeur = await ContractPowNFTInstance.createItem.call(_monument, _item, 5, {from: _owner});
				expect(valeur).to.be.bignumber.equal(targetedComposition);
			})

			
			it("3rd step : Create the first exemplaire of the monument Tour eiffel in paper (code 294509001)", async () => {

				let targetedComposition = new BN(294509001);
				let tokenId = new BN(0);
				let level = new BN(2);
				let continent = new BN(5);

				await ContractPowNFTInstance.createItem(_monument, _item, continent, {from: _owner});
				
				let newItem = await ContractPowNFTInstance.items.call(0);
				
				expect(newItem[0]).to.equal(_item);
				expect(newItem[1]).to.be.bignumber.equal(level);
				expect(newItem[2]).to.be.bignumber.equal(continent);
				expect(newItem[3]).to.be.bignumber.equal(tokenId);
				expect(newItem[4]).to.be.bignumber.equal(targetedComposition);
				expect(newItem[5]).to.be.false;
				expect(newItem[6]).to.be.false;
			})

			
			it("Final : Create the 2 first exemplaire monuments Tour eiffel in paper (code 294509001 and 294509002)" , async () => {
				
				let targetedComposition1 = new BN(294509001);
				let targetedComposition2 = new BN(294509002);
				let tokenId1 = new BN(0);
				let tokenId2 = new BN(1);
				let level = new BN(2);
				let continent = new BN(5);

				await ContractPowNFTInstance.createItem(_monument, _item, continent, {from: _owner});
				await ContractPowNFTInstance.createItem(_monument, _item, continent, {from: _owner});
				
				let newItem1 = await ContractPowNFTInstance.items.call(0);
				let newItem2 = await ContractPowNFTInstance.items.call(1);

				expect(newItem1[0]).to.equal(_item);
				expect(newItem1[1]).to.be.bignumber.equal(level);
				expect(newItem1[2]).to.be.bignumber.equal(continent);
				expect(newItem1[3]).to.be.bignumber.equal(tokenId1);
				expect(newItem1[4]).to.be.bignumber.equal(targetedComposition1);
				expect(newItem1[5]).to.be.false;
				expect(newItem1[6]).to.be.false;

				expect(newItem2[0]).to.equal(_item);
				expect(newItem2[1]).to.be.bignumber.equal(level);
				expect(newItem2[2]).to.be.bignumber.equal(continent);
				expect(newItem2[3]).to.be.bignumber.equal(tokenId2);
				expect(newItem2[4]).to.be.bignumber.equal(targetedComposition2);
				expect(newItem2[5]).to.be.false;
				expect(newItem2[6]).to.be.false;
			})
		});

		context ("Create a gold stone" , async () => {

			it("Create the first exemplaire item Pepite or (code 000992001)", async () => {

				let targetedComposition = new BN(000992001);
				let tokenId = new BN(0);
				let level = new BN(2);
				let continent = new BN(8);

				await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
				let newItem = await ContractPowNFTInstance.items.call(0);

				expect(newItem[0]).to.equal(_stone);
				expect(newItem[1]).to.be.bignumber.equal(level);
				expect(newItem[2]).to.be.bignumber.equal(continent);
				expect(newItem[3]).to.be.bignumber.equal(tokenId);
				expect(newItem[4]).to.be.bignumber.equal(targetedComposition);
				expect(newItem[5]).to.be.false;
				expect(newItem[6]).to.be.false;
			})

		});

		context ("Create a card" , async () => {

			it("Create the first card Tour eiffel (code 294000001)", async () => {

				let targetedComposition = new BN(294000001);
				let tokenId = new BN(0);
				let level = new BN(1);
				let continent = new BN(5);

				await ContractPowNFTInstance.createItem(_card, _item, continent, {from: _owner});
				let newItem = await ContractPowNFTInstance.items.call(0);

				expect(newItem[0]).to.equal(_item);
				expect(newItem[1]).to.be.bignumber.equal(level);
				expect(newItem[2]).to.be.bignumber.equal(continent);
				expect(newItem[3]).to.be.bignumber.equal(tokenId);
				expect(newItem[4]).to.be.bignumber.equal(targetedComposition);
				expect(newItem[5]).to.be.false;
				expect(newItem[6]).to.be.false;
	
			})
		});
	});

	context("Test : The Multiverse interface", async () => {
		it("Set a new player as authorized", async ()=> {

			await expectRevert(ContractPowNFTInstance.setMultiversePlayer( _player1, "albert", {from: _player2}), "you are not authorized to set this account");
			
			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert", {from: _player1});

			await expectRevert(ContractPowNFTInstance.setMultiversePlayer( _player1, "albert", {from : _owner}), "this player is already registered");
			expect(await ContractPowNFTInstance.multiverseIds.call("albert")).to.equal(_player1);
		})

		it("Update a player", async () => {

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert", {from: _owner} );
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 2, 3, {from: _owner});

			let newPlayer = await ContractPowNFTInstance.multiverseData.call(_player1);
			
			expect(newPlayer[0]).to.equal("albert");
			expect(newPlayer[1]).to.be.bignumber.equal(new BN(2));
			expect(newPlayer[2]).to.be.bignumber.equal(new BN(3));
			expect(newPlayer[3]).to.be.true;
		})
	});

	describe("Test : Obtain your rewards", async ()=> {

		it("Get a random item in the list of available items level 2 ( 4=< id < 6) ", async ()=> {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			
			
			let randItem = await ContractPowNFTInstance.getAvailableItem(2);

			expect(randItem).to.be.gte.BN(4)
			expect(randItem).not.to.be.gt.BN(6);


		})

		it("2 players get all the items lvl1", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 3, 0, {from : _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player2, "joe");
			await ContractPowNFTInstance.updateMultiversePlayer( "joe", 1, 0, {from : _owner});

			expect(await ContractPowNFTInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(0));
			expect(await ContractPowNFTInstance.balanceOf(_player2)).to.be.bignumber.equal(new BN(0));

			await ContractPowNFTInstance.getReward( {from: _player1} );
			await ContractPowNFTInstance.getReward( {from: _player2} );

			expect(await ContractPowNFTInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(3));
			expect(await ContractPowNFTInstance.balanceOf(_player2)).to.be.bignumber.equal(new BN(1));
		})

		it("2 players get all the items lvl1, the third is rejected", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 3, 0, {from : _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player2, "joe");
			await ContractPowNFTInstance.updateMultiversePlayer( "joe", 1, 0, {from : _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player3, "jack");
			await ContractPowNFTInstance.updateMultiversePlayer( "jack", 1, 0, {from : _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );
			await ContractPowNFTInstance.getReward( {from: _player2} );
			await expectRevert(ContractPowNFTInstance.getReward( {from: _player3} ), "There is not enough item availbale, please come back later" );

		})

		it("2 players get all the items lvl2, the second is rejected cause he wants 2", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 0, 1);


			await ContractPowNFTInstance.setMultiversePlayer( _player2, "joe");
			await ContractPowNFTInstance.updateMultiversePlayer( "joe", 0, 2, {from : _owner});

			expect(await ContractPowNFTInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(0));

			await ContractPowNFTInstance.getReward( {from: _player1} );

			expect(await ContractPowNFTInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(1));

			await expectRevert(ContractPowNFTInstance.getReward( {from: _player2} ), "There is not enough item availbale, please come back later" );
		})
	});

	describe ("Test : The Fusion between tokens", async ()=> {

		xit("1st step : Validate the caller is the owner", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 0, 500, 2);

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await expectRevert(ContractPowNFTInstance.fusionItem(0,3, {from: _owner}), "Not the owner of the item");
			expect(await ContractPowNFTInstance.fusionItem.call(0,3, {from:_player1})).to.be.true;

		})

		xit("2nd step : Validate the first item is not a card", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 2, 500, 2);

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await expectRevert(ContractPowNFTInstance.fusionItem(1,3, {from: _player1}), "Item no fusionnable");
			expect(await ContractPowNFTInstance.fusionItem.call(1,2, {from:_player1})).to.be.true;

		})

		xit("3rd step : Check one of them is an item", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 2, 500, 2);

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await expectRevert(ContractPowNFTInstance.fusionItem(1,3, {from: _player1}), "Item no fusionnable");
			await expectRevert(ContractPowNFTInstance.fusionItem(1,2, {from:_player1}), "Item not an item");

		})

		xit("4th step : Check one of them is an item and a material", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 3, 500, 2);

			await ContractPowNFTInstance.getReward( {from: _player1} );

			expect(await ContractPowNFTInstance.fusionItem.call(1,2, {from:_player1})).to.be.true;
			await expectRevert(ContractPowNFTInstance.fusionItem(6,1, {from:_player1}), "Two Items of the same type");

		})

		it("5th step : Check the fusion is possible", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await ContractPowNFTInstance.fusionItem.call(1,2, {from:_player1});
			await expectRevert(ContractPowNFTInstance.fusionItem(6,1, {from:_player1}), "Combination not possible");

		})

		it("6th step : Check the items exist", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await expectRevert(ContractPowNFTInstance.fusionItem(7,1, {from:_player1}), "ERC721: owner query for nonexistent token");

		})

		it("7th step : Create and affect a fusion item tour eiffel or composition : 294992001", async () => {

			let compositionFusionnedItem = new BN(294992001);

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await ContractPowNFTInstance.fusionItem(1,2, {from:_player1});

			let newFusionnedItem = await ContractPowNFTInstance.items.call(7);

			expect(newFusionnedItem[4]).to.be.bignumber.equal(compositionFusionnedItem);
			expect(await ContractPowNFTInstance.ownerOf(7)).to.equal(_player1);



		})

		it("8th step : Reaffect correctly the basic Item to the owner in locked state", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await expectRevert(ContractPowNFTInstance.items(7),"revert");

			await ContractPowNFTInstance.fusionItem(1,2, {from:_player1});

			let lockedItem = await ContractPowNFTInstance.items.call(1);

			expect(await ContractPowNFTInstance.ownerOf(7)).to.equal(_player1);
			expect(await ContractPowNFTInstance.ownerOf(1)).to.equal(_owner);
			expect(await ContractPowNFTInstance.ownerOf(2)).to.equal(_owner);
			expect(lockedItem[5]).to.be.true;

		})
	});

	describe ("Test : Unlock items", async ()=> {

		xit("1st step : Get an array of IDs of items owned by the owner ", async () => {

			let numberOfItemsOwned = new BN(2);

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 2, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await ContractPowNFTInstance.fusionItem(1,2, {from:_player1});

			
			
			let ownedItems = await ContractPowNFTInstance.getLockedItems.call({from:_owner});

			expect(ownedItems).to.be.bignumber.equal(numberOfItemsOwned);
				
			})

		it("2nd step : Get the list of locked an item", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 2, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await ContractPowNFTInstance.fusionItem(1,2, {from:_player1});
			
			let ownedItems = await ContractPowNFTInstance.getLockedItems.call({from:_owner});

			expect(ownedItems[0]).to.be.bignumber.equal(new BN(1));
			expect(ownedItems[1]).to.be.bignumber.equal(new BN(2));
		})

		it("3rd step : Unlock an item ", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert", 2, 3, {from: _owner});

			await ContractPowNFTInstance.getReward( {from: _player1} );

			await ContractPowNFTInstance.fusionItem(1,2, {from:_player1});
			
			let ownedItems = await ContractPowNFTInstance.items.call(1);

			expect(ownedItems[5]).to.be.true;

			await ContractPowNFTInstance.unlock(1);

			ownedItems = await ContractPowNFTInstance.items.call(1);

			expect(ownedItems[5]).to.be.false;

		})
	});

	describe ("Test : View function in the market Place", async ()=> {

		it("Get a list of the item's owner on a selected continent", async () => {

			let europe = 5;
			let allOverTheWorld = 8;
			let rewardExpected = new BN(1000);

			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",3, 0,{from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player2, "john");
			await ContractPowNFTInstance.updateMultiversePlayer( "john", 1, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});
			await ContractPowNFTInstance.getReward({from: _player2});

			let allOverTheWorldItemsOwnerAddress = await ContractPowNFTInstance.getRankByContinent.call(allOverTheWorld);

			expect(allOverTheWorldItemsOwnerAddress).to.include.members([_player2]);	

			let europeItemsOwnerAddress = await ContractPowNFTInstance.getRankByContinent.call(europe);

			expect(europeItemsOwnerAddress).to.include.members([_player2,_player1]);		
		})

		it("Get all the items Ids of an address", async () => {

				
			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",4, 0, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player2, "john");
			await ContractPowNFTInstance.updateMultiversePlayer( "john", 0, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});
			await ContractPowNFTInstance.getReward({from: _player2});

			let allIdOwned = await ContractPowNFTInstance.getItemsOfPlayer.call(_player1);

			expect(allIdOwned).to.have.lengthOf(4);
			
		})
	})

	describe ("Test : Selling Items", async ()=> {

		it("Set a new market order", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});

			await ContractPowNFTInstance.setMarketOrder(150, 3, {from:_player1});
			await ContractPowNFTInstance.setMarketOrder(150, 2, {from:_player1});
			await ContractPowNFTInstance.setMarketOrder(150, 1, {from:_player1});

			let marketTab  = await ContractPowNFTInstance.marketOrders.call(3);
			let soldToken =  await ContractPowNFTInstance.items.call(3);

			expect(marketTab[0]).to.be.bignumber.equal(new BN(3));
			expect(marketTab[1]).to.be.bignumber.equal(new BN(150));
			expect(marketTab[2]).to.be.true;

			expect(soldToken[6]).to.be.true;

		})

		it("Set a new market order with withelisted", async () => {

			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});

			await ContractPowNFTInstance.setMarketOrder(150, 2, {from:_player1});
			await ContractPowNFTInstance.setMarketOrderWhitelisted(150, 3, _player2,{from:_player1});

			let withelistedOrder = await ContractPowNFTInstance.orderWithWithelist.call(3);

			expect(withelistedOrder[0]).to.equal(_player2);
			
		})

		it("Get a selling order", async () => {

			let price = new BN(2);
			let multiplicator = new BN(1).mul(new BN(1000000000)).mul(new BN(1000000000));
			let finalPrice = price * multiplicator;
			
			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});

			await ContractPowNFTInstance.setMarketOrder(price, 2, {from:_player1});
			
			await ContractPowNFTInstance.getOrder(2, {from:_player2, value: web3.utils.toWei(price, 'ether')})

			let soldToken = await ContractPowNFTInstance.items.call(2);

			expect(soldToken[6]).to.be.false;
			expect(await ContractPowNFTInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(6));
			expect(await ContractPowNFTInstance.balanceOf(_player2)).to.be.bignumber.equal(new BN(1));
				
		})

		it("Get a selling order whitlisted and the order disipears of the list", async () => {

			let price = new BN(2);
			let multiplicator = new BN(1).mul(new BN(1000000000)).mul(new BN(1000000000));
			let finalPrice = price * multiplicator;
			
			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});

			await ContractPowNFTInstance.setMarketOrderWhitelisted(price, 2, _player2, {from:_player1});
			
			await expectRevert(ContractPowNFTInstance.getWhitelistedOrder(2, {from:_player3, value: web3.utils.toWei(price, 'ether')}), "Not the selected reiceiver");
			await ContractPowNFTInstance.getWhitelistedOrder(2, {from:_player2, value: web3.utils.toWei(price, 'ether')});
			let order = await ContractPowNFTInstance.marketOrders.call(2);

			expect(await ContractPowNFTInstance.balanceOf(_player3)).to.be.bignumber.equal(new BN(0));
			expect(await ContractPowNFTInstance.balanceOf(_player2)).to.be.bignumber.equal(new BN(1));
			expect(order[2]).to.be.false;
		})

		it("The seller withdrawn the good amount", async () => {

			let priceETH = new BN(2).mul(new BN(1000000000)).mul(new BN(1000000000));

			let priceBN = new BN(2);
			
			let balanceBefore = await web3.eth.getBalance(_player1);

			await ContractPowNFTInstance.createItem(_card, _item, 5,  {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});
			await ContractPowNFTInstance.createItem(_monument, _item,5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5 ,{from: _owner});
			await ContractPowNFTInstance.createItem(_card, _item, 5, {from: _owner});
			await ContractPowNFTInstance.createItem(_material, _stone, 8, {from: _owner});

			await ContractPowNFTInstance.setMultiversePlayer( _player1, "albert");
			await ContractPowNFTInstance.updateMultiversePlayer( "albert",4, 3, {from: _owner});

			await ContractPowNFTInstance.getReward({from: _player1});

			await ContractPowNFTInstance.setMarketOrder(priceBN, 2, {from:_player1});
			
			await ContractPowNFTInstance.getOrder(2, {from:_player2, value: web3.utils.toWei(priceBN,'ether')});
 
			await ContractPowNFTInstance.withdrawAmount({from: _player1});

			let balanceAfter = await web3.eth.getBalance(_player1);;

			expect(Number(balanceAfter)).to.be.within(Number(balanceBefore), Number(balanceBefore) + Number(priceETH));
		})
	});
})