const powTournament = artifacts.require("./contracts/POWTournament.sol");
const { expect } = require('chai');
const { BN } = require('@openzeppelin/test-helpers');


contract("POWTournament", accounts => {

    const _name = "POWTournament";
    const _symbol = "POW";
    const _duration = 60;
    //const _quizType = "Geography";
    const _penalty = 10;
    const _packRate = 10;
    const _packPeriod = 20;
    const _totalSupply = new BN('10000000000000000');
    const _decimals = new BN(4);
    const _owner = accounts[0];
    const _player = accounts[1];
    const _balanceOfTheAccount = new BN('10000000000000000');

    //const _amount = new BN('1000000000');
    const _amount = 456;
    const _stakingPackID = 2;

    let powTournamentInstance;

    describe("POWTournament", function() {

        beforeEach(async () => {

            powTournamentInstance = await powTournament.new();
        });

        describe("test of the small functions of the smart contract: POWTournament", function() {

            it("has a symbol.", async () => {
                expect(await powTournamentInstance.symbol()).to.equal(_symbol);
            });

            it("has a name", async () => {
                expect(await powTournamentInstance.name()).to.equal(_name);
            });

            it("has a quiz type", async () => {
                //for a set
                const quizType = "Geography";
                await powTournamentInstance.setQuizType(quizType);
                expect(await powTournamentInstance._quizType.call({from: accounts[0]})).to.equal(quizType);

            });

            it("The duration should store the value 60.", async () => {
                // Set value of 120
                const duration = 120;
                await powTournamentInstance.setDuration(duration);
                expect(await powTournamentInstance._duration.call({from: accounts[0]})).to.equal(duration);



                //await powTournamentInstance.setDuration(60, {from: accounts[0]});
            });

            it("The duration should return the value 60.", async () => {
                // Get stored value
                expect(await powTournamentInstance.getDuration());
            });

            it("has a penalty", async function() {

                expect(await powTournamentInstance.setPenalty.call(10)).to.be.true;
            });

            it("Has a total supply", async () => {

                expect(await powTournamentInstance.totalSupply()).to.be.bignumber.equal(_totalSupply);
            });

            it("Has decimals", async () => {

                expect(await powTournamentInstance.decimals()).to.be.bignumber.equal(_decimals);
            });

            it("Has owner", async function () {
                expect(await powTournamentInstance.getOwner()).to.equal(_owner);
            });

            it("Has balance of", async function () {
                expect(await powTournamentInstance.balanceOf(_owner)).to.be.bignumber.equal(_balanceOfTheAccount);
            });

            it("has a addStakingPack", async function() {
                expect(await powTournamentInstance.addStakingPack.call(5,10)).to.be.true;
            });

        });

        describe("big functions for the business logic of the smart contract: POWTournament", function() {

            it("Get a reward", async function () {

                let targetedReward = 55666677;
                const valeur = await powTournamentInstance.getRewards.call(_amount, _stakingPackID, {from: _owner});
                expect(valeur).to.be.bignumber.equal(targetedReward);
            });

            //...

            it("Burn an amount", async function () {


            });


            it("Event: Transfer", async function() {
                expectEvent(await this.powTournamentInstance.Transfer(_player, {from:owner}, 500),
                    "The transfer is started");
            });

        });







    });



});


