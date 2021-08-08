const PowToken = artifacts.require("powStakingTournament");
const { expect } = require('chai');
const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const {increaseTime} = require("./helpers/time2")
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
  	const _2Days = 2*3600*24;

	beforeEach(async ()=> {
		PowTokenInstance = await PowToken.new(new BN(200), _initialSupply);
	});

	
	xdescribe ("Test : Obtain ERC20 rewards", async ()=> {

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

	
	describe ("Test : Tournamnent", async ()=> {

		it("Set a tournanement", async () => {

			let idTournament = new BN(0);
			let duration = new BN(1);
			let stake = new BN(5);
			let subject = "Australia";
			let reward = new BN(5);

			await PowTokenInstance.setTournament(subject,stake, duration, idTournament,reward, {from : _owner});
			let checkTournament = await PowTokenInstance.tournaments.call(0);	

			expect(checkTournament[0]).to.be.bignumber.equal(idTournament);
			expect(checkTournament[1]).to.be.bignumber.equal(stake);
			expect(checkTournament[3]).to.be.bignumber.equal(reward);
			expect(checkTournament[4]).to.be.bignumber.equal(subject);
			expect(checkTournament[5]).to.be.true;
			expect(checkTournament[6]).to.be.bignumber.equal(new BN(1));

		})

		it("End a tournanement", async () => {
				
			let idTournament = new BN(0);
			let duration = new BN(1);
			let stake = new BN(5);
			let subject = "Australia";
			let reward = new BN(5);

			await PowTokenInstance.setTournament(subject,stake, duration, idTournament, reward, {from : _owner});
			
			let checkTournament = await PowTokenInstance.tournaments.call(0);	
			expect(checkTournament[0]).to.be.bignumber.equal(idTournament);
			expect(checkTournament[1]).to.be.bignumber.equal(stake);
			expect(checkTournament[3]).to.be.bignumber.equal(reward);
			expect(checkTournament[4]).to.be.bignumber.equal(subject);
			expect(checkTournament[5]).to.be.true;
			expect(checkTournament[6]).to.be.bignumber.equal(new BN(1));

			await expectRevert(PowTokenInstance.endTournament( idTournament, {from: _owner}), "Please wait for the time set to finish");

			await increaseTime(_2Days);

			await PowTokenInstance.endTournament(idTournament, {from : _owner});

			let checkTournament2 = await PowTokenInstance.tournaments.call(0);

			expect(checkTournament2[6]).to.be.bignumber.equal(new BN(2));	
		})

		it("Set a winner", async () => {
			
			let idTournament = new BN(0);
			let duration = new BN(1);
			let stake = new BN(5);
			let subject = "Australia";
			let reward = new BN(5);

			await PowTokenInstance.setTournament(subject,stake, duration, idTournament,reward, {from : _owner});
			
			await increaseTime(_2Days);

			await PowTokenInstance.endTournament(idTournament, {from : _owner});

			await PowTokenInstance.setWinner(idTournament, _player1, {from : _owner});

			let checkTournament = await PowTokenInstance.tournaments.call(0);

			expect(checkTournament[7]).to.equal(_player1);	
		})
	})

	describe ("Test : Register player", async ()=> {

		it("Register a new player", async () => {
				
			let idTournament = new BN(0);
			let duration = new BN(1);
			let stake = new BN(5);
			let subject = "Australia";
			let reward = new BN(5);

			await PowTokenInstance.myMint(_player1,stake);

			await PowTokenInstance.setTournament(subject,stake, duration, idTournament,reward, {from : _owner});
			
			await PowTokenInstance.registerPlayer(idTournament, stake, {from:_player1});

			let checkTournament = await PowTokenInstance.balanceStaking.call(_player1,0);
			let newBalancePlayer = await PowTokenInstance.balanceOf(_player1);

			expect(checkTournament[1]).to.be.true;
			expect(newBalancePlayer).to.be.bignumber.equal(new BN(0));

		})

		it("Player Withdraw staking", async () => {
				
			let idTournament = new BN(0);
			let duration = new BN(1);
			let stake = new BN(5);
			let subject = "Australia";
			let reward = new BN(5);

			await PowTokenInstance.myMint(_player1,stake);

			await PowTokenInstance.setTournament(subject,stake, duration, idTournament,reward, {from : _owner});
			
			await PowTokenInstance.registerPlayer(idTournament, stake, {from:_player1});

			await increaseTime(_2Days);

			await PowTokenInstance.endTournament(idTournament, {from : _owner});

			await PowTokenInstance.setWinner(idTournament, _player1, {from : _owner});

			await PowTokenInstance.withdrawStaking(idTournament,{from : _player1});


			let checkTournament = await PowTokenInstance.balanceStaking.call(_player1,0);

			expect(checkTournament[0]).to.be.bignumber.equal(new BN(0));
			expect(checkTournament[1]).to.be.true;
			expect(checkTournament[2]).to.be.true;

		})

		it("Winner Withdraw reward", async () => {
				
			let idTournament = new BN(0);
			let duration = new BN(1);
			let stake = new BN(5);
			let subject = "Australia";
			let reward = new BN(5);

			await PowTokenInstance.myMint(_player1,stake);

			await PowTokenInstance.setTournament(subject,stake, duration, idTournament,reward, {from : _owner});
			
			await PowTokenInstance.registerPlayer(idTournament, stake, {from:_player1});

			await increaseTime(_2Days);

			await PowTokenInstance.endTournament(idTournament, {from : _owner});

			await PowTokenInstance.setWinner(idTournament, _player1, {from : _owner});

			await PowTokenInstance.withdrawStaking(idTournament,{from : _player1});

			await PowTokenInstance.withdrawReward({from : _player1});

			let newBalancePlayer = await PowTokenInstance.balanceOf(_player1);

			expect(newBalancePlayer).to.be.bignumber.equal(new BN(10));
		})
	})

})