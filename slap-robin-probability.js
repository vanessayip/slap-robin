/*
This solution finds the applicant based on highest expected value (probability) of winning as opposed to the other solution which is more up to chance
*/

const { compileApplicantsData } = require('./compile-applicants-data');

const slapOff2 = (applicantsData) => {
    // prepopulate stats
    const stats = [];
    for (let i = 0; i < applicantsData.length; i++) {
      stats[i] = [];
      for (let j = 0; j < applicantsData.length; j++) {
        if (i === j) {
          stats[i][j] = 0;
        }
      }
    }
  
    // find stats
    for (let i = 0; i < applicantsData.length; i++) {
      for (let j = i + 1; j < applicantsData.length; j++) {
        let roundCounter = 0;
        let winnerFound = false;
        let candidatesData = {
          1: Object.assign({}, applicantsData[i]),
          2: Object.assign({}, applicantsData[j]),
        };
        while (!winnerFound) {
          console.log(`Round ${roundCounter + 1}`);
          // candidatesData = findFirstCandidate(i, j, candidatesData);
          const results = alternateSlaps2(candidatesData);
          winnerFound = results.winnerFound;
          if (winnerFound) {
            stats[i][j] = results.probability;
            stats[j][i] = 1 - results.probability;
          }
          roundCounter++;
        }
      }
    }
    return stats;
  }
  
  const alternateSlaps2 = (candidatesData) => {
    const candidate1MaxDamagePerRound = candidatesData['2'].Attacks * candidatesData['2'].Damage;
    const candidate2MaxDamagePerRound = candidatesData['1'].Attacks * candidatesData['1'].Damage;
    const candidate1NewHealth = candidatesData['1'].Health - candidate2MaxDamagePerRound;
    const candidate2NewHealth = candidatesData['2'].Health - candidate1MaxDamagePerRound;
    if (candidate1NewHealth <= 0 && candidate2NewHealth > 0) {
      console.log(`Candidate ${candidatesData['1'].Name} wins round against candidate ${candidatesData['2'].Name} with hp of ${candidate1NewHealth} vs ${candidate2NewHealth}`);
      return {
        winnerFound: true,
        probability: 1, // relative to candidate 1
      }
    } else if (candidate2NewHealth <= 0 && candidate1NewHealth > 0) {
      console.log(`Candidate ${candidatesData['2'].Name} wins round against candidate ${candidatesData['1'].Name} with hp of ${candidate2NewHealth} vs ${candidate1NewHealth}`);
      return {
        winnerFound: true,
        probability: 1, // relative to candidate 1
      }
    } else if (candidate2NewHealth > 0 && candidate1NewHealth > 0) {
      candidatesData['1'].Health = candidate1NewHealth;
      candidatesData['2'].Health = candidate2NewHealth;
      console.log(`No winners between candidate ${candidatesData['1'].Name} and candidate ${candidatesData['2'].Name} with hp of ${candidate1NewHealth} vs ${candidate2NewHealth}`);
      return {
        winnerFound: false,
      }
    } else {
     const probability = findProbability(candidatesData);
      return {
        winnerFound: true,
        probability, // relative to candidate 1
      }
    }
  }
  
  const findProbability = (candidatesData) => {
    const candidate1MaxAttacksToZeroHp = Math.ceil(candidatesData['1'].Health/candidatesData['2'].Damage);
    const candidate2MaxAttacksToZeroHp = Math.ceil(candidatesData['2'].Health/candidatesData['1'].Damage);
    if (candidate1MaxAttacksToZeroHp === candidate2MaxAttacksToZeroHp) {
      return 0.5;
    } else if (candidate2MaxAttacksToZeroHp > candidate1MaxAttacksToZeroHp) {
      return 0; // candidate 1 will always lose
    } else {
      return 1; // candidate 1 will always win
    }
  }
  
  const findWinningApplicant = (stats) => {
    const scores = [];
    for (let i = 0; i < stats.length; i++) {
      scores.push(stats[i].reduce((a, b) => a + b, 0));
    }
    const maxScore = Math.max(...scores);
    const ids = scores.filter(score => score === maxScore);
    console.log(ids)
    if (ids.length > 1) {
      // multiple applicants with highest expected value
      // go with applicant with the most number of wins
      // TODO
      return ids[0]
    } else {
      return ids[0];
    }
  }
  
  const run = async () => {
    const applicantsData = await compileApplicantsData();
    const stats = slapOff2(applicantsData);
    // sum each player's percentage of winning
    const id = findWinningApplicant(stats);
    console.log(`The applicant with the highest percentage of wins is ${applicantsData[id].Name}`);
  }
  
  module.exports = { run, slapOff2, findWinningApplicant };
  