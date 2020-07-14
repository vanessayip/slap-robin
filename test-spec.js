const { expect } = require('chai');
const { slapOff2: slapOffProbability } = require('./slap-robin-probability.js');
const { slapOff: slapOffChance } = require('./slap-robin-chance.js');

describe('Test spec for slap-robin', () => {
    let applicationData;
    beforeEach(() => {
        applicationData = [
            {
              Name: 'John Smith',
              Health: '130',
              Damage: '10',
              Attacks: '4',
              Initiative: '9',
              Id: 0
            },
            {
                Name: 'Jane Doe',
                Health: '140',
                Damage: '8',
                Attacks: '6',
                Initiative: '4',
                Id: 1
              },
        ];
    });
    describe('Chance', async () => {
        it('There is 1 win amongst 2 applicants', () => {
            const wins = slapOffChance(applicationData);
            expect(Object.keys(wins)).to.be.have.lengthOf(1);
        });
    });
    describe('Probability', () => {
        it('Stats generated by 2 applicants is a 2x2 array', async () => {
            const stats = slapOffProbability(applicationData);
            expect(stats).to.be.have.lengthOf(2);
            expect(stats[0]).to.be.an('array');
        });
    });
  });