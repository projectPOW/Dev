const itemsFactory = artifacts.require("itemsFactory");
const { expect } = require('chai');
const { BN } = require('@openzeppelin/test-helpers');
const time = require("./helpers/time");



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

	it("has a name", async () =>{
		expect(await itemsFactoryInstance.name()).to.equal(_name);		
	});

	it("has a symbol", async () =>{
		expect(await itemsFactoryInstance.symbol()).to.equal(_symbol);
	});
	context ("create tour eiffel in paper" , async () => {

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

		it("create the first exemplaire item Tour eiffel in paper code 294509001", async () => {

			let targetedComposition = new BN(294509001);
			const valeur = await itemsFactoryInstance.createItem.call(_monument, _item,  {from: _owner});
			expect(valeur).to.be.bignumber.equal(targetedComposition);
			})

		
		it("create the 2 first exemplaire item Tour eiffel in paper code 294509001 and 294509002" , async () => {
			
			let targetedComposition2 = new BN(294509002);
			await itemsFactoryInstance.createItem(_monument, _item,  {from: _owner});
			const valeur2 =  await itemsFactoryInstance.createItem.call(_monument, _item,  {from: _owner});
			expect(valeur2).to.be.bignumber.equal(targetedComposition2);
			})
			

	});

	context ("create a gold stone" , async () => {

		it("create the first exemplaire item Pepite or code 000992001", async () => {

			let targetedComposition = new BN(000992001);
			const valeur = await itemsFactoryInstance.createItem.call(_material, _stone,  {from: _owner});
			expect(valeur).to.be.bignumber.equal(targetedComposition);
			})

	});

	context ("create a card" , async () => {

		it("create the first card Tour eiffel code 2940000001", async () => {

			let targetedComposition = new BN(294000001);
			const valeur = await itemsFactoryInstance.createItem.call(_card, _item,  {from: _owner});
			expect(valeur).to.be.bignumber.equal(targetedComposition);
			})
	});

	it("create an item and attribuate it to the owner", async () =>{
		let _balance = new BN(1);
		await itemsFactoryInstance.createItem(_material, _stone,  {from: _owner});
		expect(await itemsFactoryInstance.balanceOf(_owner)).to.be.bignumber.equal(_balance);
	});

	it("set a new player", async ()=> {

		await itemsFactoryInstance.setMultiversePlayer( _player1, "albert");
		expect(await itemsFactoryInstance.multiverseIds.call("albert")).to.equal(_player1);
	})

	it("update a player", async () => {

		await itemsFactoryInstance.setMultiversePlayer( _player1, "albert");
		await itemsFactoryInstance.updateMultiversePlayer( "albert", 2, 2);
		expect(await itemsFactoryInstance.multiverseData.call(_player1)).to.include({login : "albert"});
	})



})