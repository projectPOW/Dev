const PowToken = artifacts.require("POWToken");
const { expect } = require('chai');
const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const time = require("./helpers/time");
var chai = require('chai');
var bnChai = require('bn-chai');
chai.use(bnChai(BN));



contract("Contract Pow ERC20", accounts => {

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
		PowTokenInstance = await PowToken.new(new BN(200), _initialSupply);
	});

	
	describe ("Test : Obtain ERC20 rewards", async ()=> {

		it("Get the amount of token function of XP (1000) and his state is updated ", async () => {

				let rewardforEachXpStage = new BN(500);
				let rewardExpected = new BN(1000);


				await PowTokenInstance.setMultiversePlayer( _player1, "albert", {from: _owner});
				await PowTokenInstance.updateMultiversePlayer( "albert", 500, {from: _owner});

				await PowTokenInstance.setReward(rewardforEachXpStage);
				await PowTokenInstance.getReward({from: _player1});

				let Player = await PowTokenInstance.multiverseData.call(_player1);

				expect(Player[1]).to.be.bignumber.equal(new BN(2));
				expect(await PowTokenInstance.balanceOf(_player1)).to.be.bignumber.equal(rewardExpected);		
		})

		it("Player Revert if he tries two withdraw twice ", async () => {

				let rewardforEachXpStage = new BN(500);
				let rewardExpected = new BN(1000);


				await PowTokenInstance.setMultiversePlayer( _player1, "albert", {from: _owner});
				await PowTokenInstance.updateMultiversePlayer( "albert", 500, {from: _owner});

				await PowTokenInstance.setReward(rewardforEachXpStage);
				await PowTokenInstance.getReward({from: _player1});	

				await expectRevert(PowTokenInstance.getReward({from : _player1}), "nothing to withdraw for now");
		})

		it("Transaction goes through after update", async () => {

				let rewardforEachXpStage = new BN(500);
				let rewardExpected = new BN(2500);


				await PowTokenInstance.setMultiversePlayer( _player1, "albert", {from: _owner});
				await PowTokenInstance.updateMultiversePlayer( "albert", 500, {from: _owner});

				await PowTokenInstance.setReward(rewardforEachXpStage);
				await PowTokenInstance.getReward({from: _player1});	

				await PowTokenInstance.updateMultiversePlayer( "albert", 1000, {from: _owner});
				await PowTokenInstance.getReward({from: _player1});	

				expect(await PowTokenInstance.balanceOf.call(_player1)).to.be.bignumber.equal(rewardExpected);

		})
	});

	
	xdescribe ("Tournamnent", async ()=> {

		it("set a tournanement", async () => {

				let idTournament = new BN(0);
				let duration = new BN(1);
				let stake = new BN(5);
				let rewardforEachXpStage = new BN(500);
				let subject = "Australia";

				await PowTokenInstance.setTournament(stake, duration, idTournament,subject);
				let checkTournament = await PowTokenInstance.tournaments.call(0);	

				expect(checkTournament[0]).to.be.bignumber.equal(stake);
				expect(checkTournament[1]).to.be.bignumber.equal(duration);
				expect(checkTournament[3]).to.be.bignumber.equal(subject);
				expect(checkTournament[4]).to.be.true;

		})

		xit("set a tournanement", async () => {

				let idTournament = 0;
				let duration = 1;
				let stake = 5;
				let rewardforEachXpStage = new BN(500);

				await PowTokenInstance.createItem(_card, _item, 5,  {from: _owner});
				await PowTokenInstance.createItem(_material, _stone, 8, {from: _owner});
				await PowTokenInstance.createItem(_monument, _item,5, {from: _owner});
				await PowTokenInstance.createItem(_card, _item, 5, {from: _owner});
				await PowTokenInstance.createItem(_card, _item, 5 ,{from: _owner});
				await PowTokenInstance.createItem(_card, _item, 5, {from: _owner});
				await PowTokenInstance.createItem(_material, _stone, 8, {from: _owner});

				await PowTokenInstance.setMultiversePlayer( _player1, "albert");
				await PowTokenInstance.updateMultiversePlayer( "albert",3, 0, 500, 0);

				await PowTokenInstance.setMultiversePlayer( _player2, "john");
				await PowTokenInstance.updateMultiversePlayer( "john", 1, 3, 500, 0);

				await PowTokenInstance.getReward({from: _player1});
				await PowTokenInstance.getReward({from: _player2});

				let Player = await PowTokenInstance.multiverseData.call(_player1); 

				await PowTokenInstance.setReward(rewardforEachXpStage);
				await PowTokenInstance.attributeReward(Player[4],Player[5],_player1);	

				console.log(await PowTokenInstance.balanceOf(_player1));
		})
	})

})