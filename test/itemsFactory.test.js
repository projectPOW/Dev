const itemsFactory = artifacts.require("itemsFactory");
const { expect } = require('chai');
const { BN } = require('@openzeppelin/test-helpers');
const time = require("./helpers/time");
var chai = require('chai');
var bnChai = require('bn-chai');
chai.use(bnChai(BN));



contract("itemsFactory", accounts => {

	const _name = "PowItems";
	const _symbol = "POW";
	const _owner = accounts[0];
	const _player1 = accounts[1];
	const _player2 = accounts[2];
	const _player3 = accounts[3];
	const _item = "Tour eiffel";
	const _stone = "Pepite or";
	const _monument = "Monument";
    const _material = "Material";
  	const _card = "Card";

	beforeEach(async ()=> {
		itemsFactoryInstance = await itemsFactory.new();
	});

	xit("retourne 1 to validate the connexion", async () =>{
		let number = new BN(1);
		expect(await itemsFactoryInstance.get1.call()).to.be.bignumber.equal(number);		
	});

	context ("ERC 721", async () => {

		it("has a name", async () =>{
			expect(await itemsFactoryInstance.name()).to.equal(_name);		
		});

		it("has a symbol", async () =>{
			expect(await itemsFactoryInstance.symbol()).to.equal(_symbol);
		});

		it("create an item and attribute it to the owner", async () =>{
		
		let _balance = new BN(1);
		await itemsFactoryInstance.createItem(_material, _stone,  {from: _owner});
		expect(await itemsFactoryInstance.balanceOf(_owner)).to.be.bignumber.equal(_balance);
		expect(await itemsFactoryInstance.ownerOf(0)).to.equal(_owner);
		});



	})

	context ("Create tour eiffel in paper" , async () => {

		xit("create the item Tour eiffel code 294", async () => {

			let targetedComposition = new BN(294);
			const valeur = await itemsFactoryInstance.createItem.call(_monument, _item, {from: _owner});
			expect(valeur).to.be.bignumber.equal(targetedComposition);
			})

		xit("create the base composition of the item Tour eiffel in paper code 294509", async () => {

			let targetedComposition = new BN(294509);
			const valeur = await itemsFactoryInstance.createItem.call(_monument, _item,  {from: _owner});
			expect(valeur).to.be.bignumber.equal(targetedComposition);
			})

		/*xit("create the first exemplaire item Tour eiffel in paper code 294509001", async () => {

			let targetedComposition = new BN(294509001);
			const valeur = await itemsFactoryInstance.createItem.call(_monument, _item,  {from: _owner});
			expect(valeur).to.be.bignumber.equal(targetedComposition);
			})*/

		it("create the first exemplaire item Tour eiffel in paper code 294509001", async () => {

			let targetedComposition = new BN(294509001);
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			let newItem = await itemsFactoryInstance.items.call(0);
			expect(newItem[0]).to.equal(_item);
			expect(newItem[1]).to.be.bignumber.equal(targetedComposition);
			expect(newItem[2]).to.be.bignumber.equal(new BN(2));
			expect(newItem[3]).to.be.false;
			})

		
		it("create the 2 first exemplaire item Tour eiffel in paper code 294509001 and 294509002" , async () => {
			
			let targetedComposition1 = new BN(294509001);
			let targetedComposition2 = new BN(294509002);
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			let newItem1 = await itemsFactoryInstance.items.call(0);
			let newItem2 = await itemsFactoryInstance.items.call(1);

			expect(newItem1[0]).to.equal(_item);
			expect(newItem1[1]).to.be.bignumber.equal(targetedComposition1);
			expect(newItem1[2]).to.be.bignumber.equal(new BN(2));
			expect(newItem1[3]).to.be.false;

			expect(newItem2[0]).to.equal(_item);
			expect(newItem2[1]).to.be.bignumber.equal(targetedComposition2);
			expect(newItem2[2]).to.be.bignumber.equal(new BN(2));
			expect(newItem2[3]).to.be.false;

			})
			

	});

	context ("Create a gold stone" , async () => {

		it("create the first exemplaire item Pepite or code 000992001", async () => {

			let targetedComposition = new BN(000992001);
			await itemsFactoryInstance.createItem(_material, _stone,  {from: _owner});
			let newItem = await itemsFactoryInstance.items.call(0);

			expect(newItem[0]).to.equal(_stone);
			expect(newItem[1]).to.be.bignumber.equal(targetedComposition);
			expect(newItem[2]).to.be.bignumber.equal(new BN(2));
			expect(newItem[3]).to.be.false;
			})

	});

	context ("Create a card" , async () => {

		it("create the first card Tour eiffel code 294000001", async () => {

			let targetedComposition = new BN(294000001);
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			let newItem = await itemsFactoryInstance.items.call(0);

			expect(newItem[0]).to.equal(_item);
			expect(newItem[1]).to.be.bignumber.equal(targetedComposition);
			expect(newItem[2]).to.be.bignumber.equal(new BN(1));
			expect(newItem[3]).to.be.false;
			})
	});

	context("Add player", async () => {
		it("set a new player", async ()=> {

			await itemsFactoryInstance.setMultiversePlayer( _player1, "albert");
			expect(await itemsFactoryInstance.multiverseIds.call("albert")).to.equal(_player1);
		})

		it("update a player", async () => {

			await itemsFactoryInstance.setMultiversePlayer( _player1, "albert");
			await itemsFactoryInstance.updateMultiversePlayer( "albert", 2, 3);
			let newPlayer = await itemsFactoryInstance.multiverseData.call(_player1);
			expect(newPlayer[0]).to.equal("albert");
			expect(newPlayer[1]).to.be.bignumber.equal(new BN(2));
			expect(newPlayer[2]).to.be.bignumber.equal(new BN(3));
		})
	});

	describe("Obtain your rewards", async ()=> {

		it("get a random item in the list of available items", async ()=> {

			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_material, _stone,  {from: _owner});
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});


			
			let randItem = await itemsFactoryInstance.getAvailableItem(1);

			expect(randItem).not.to.be.gt.BN(5);


		})

		it("get a random item lvl1", async () => {

			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_material, _stone,  {from: _owner});
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});

			await itemsFactoryInstance.setMultiversePlayer( _player1, "albert");
			await itemsFactoryInstance.updateMultiversePlayer( "albert", 3, 0);

			expect(await itemsFactoryInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(0));

			await itemsFactoryInstance.getReward( {from: _player1} );

			expect(await itemsFactoryInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(3));

			/*console.log(await itemsFactoryInstance.ownerOf(0));
			console.log(await itemsFactoryInstance.ownerOf(1));
			console.log(await itemsFactoryInstance.ownerOf(2));
			console.log(await itemsFactoryInstance.ownerOf(3));
			console.log(await itemsFactoryInstance.ownerOf(4));
			console.log(await itemsFactoryInstance.ownerOf(5));*/
		})

		it("get a random item lvl2", async () => {

			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_material, _stone,  {from: _owner});
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});
			await itemsFactoryInstance.createItem(_card, _item,  {from: _owner});

			await itemsFactoryInstance.setMultiversePlayer( _player1, "albert");
			await itemsFactoryInstance.updateMultiversePlayer( "albert", 0, 1);

			expect(await itemsFactoryInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(0));

			await itemsFactoryInstance.getReward( {from: _player1} );

			expect(await itemsFactoryInstance.balanceOf(_player1)).to.be.bignumber.equal(new BN(1));

			/*console.log(await itemsFactoryInstance.ownerOf(0));
			console.log(await itemsFactoryInstance.ownerOf(1));
			console.log(await itemsFactoryInstance.ownerOf(2));
			console.log(await itemsFactoryInstance.ownerOf(3));
			console.log(await itemsFactoryInstance.ownerOf(4));
			console.log(await itemsFactoryInstance.ownerOf(5));*/
		})
	});

})