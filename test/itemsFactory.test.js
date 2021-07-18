const itemsFactory = artifacts.require("itemsFactory");
const { expect } = require('chai');
const { BN } = require('@openzeppelin/test-helpers');


contract("itemsFactory", accounts => {

	const _name = "PowItems";
	const _symbol = "POW";

	beforeEach(async ()=> {
		itemsFactoryInstance = await itemsFactory.new();
	});

	it("has a name", async () => {
		expect(await itemsFactoryInstance.name()).to.equal(_name);		
	});

	it("has a symbol", async () => {
		expect(await itemsFactoryInstance.symbol()).to.equal(_symbol);
	})

})