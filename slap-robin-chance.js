/*
This solution is more up to chance as opposed to the expected value (probability)
*/

const slapOff = (applicantsData) => {
  const wins = {};
  for (let i = 0; i < applicantsData.length; i++) {
    for (let j = i + 1; j < applicantsData.length; j++) {
      let roundCounter = 0;
      let winnerCandidate = 0;
      let candidatesData = {
        1: Object.assign({}, applicantsData[i]),
        2: Object.assign({}, applicantsData[j]),
      };
      while (!winnerCandidate) {
        console.log(`Round ${roundCounter + 1}`);
        candidatesData = findFirstCandidate(i, j, applicantsData, candidatesData);
        winnerCandidate = alternateSlaps(candidatesData);
        roundCounter++;
      }
      let id = candidatesData[winnerCandidate].Id;
      wins[id] = wins[id] ? wins[id] + 1 : 1;
      console.log(`Candidate ${candidatesData[winnerCandidate].Name} wins!`);
    }
  }
  return wins;
}

const findWinningApplicant = (wins) => {
  const highestValue = Math.max(...Object.values(wins));
  const id = Object.keys(wins).find(k => wins[k] === highestValue);
  return id;
}

const findFirstCandidate = (i, j, applicantsData, candidatesData) => {
  let winningInitiative;
  let losingInitiative;
  let candidateIInitiativeRoll = Math.floor( Math.random() * 6 ) + applicantsData[i].Initiative;
  let candidateJInitiativeRoll = Math.floor( Math.random() * 6 ) + applicantsData[j].Initiative;
  // TODO: loop until there is a winner
  if (candidateIInitiativeRoll >= candidateJInitiativeRoll) {
    winningInitiative = candidateIInitiativeRoll;
    losingInitiative = candidateJInitiativeRoll;
  } else {
    let temp = Object.assign({}, candidatesData['1']);
    candidatesData['1'] = candidatesData['2'];
    candidatesData['2'] = temp;
    winningInitiative = candidateJInitiativeRoll;
    losingInitiative = candidateIInitiativeRoll;
  }
  console.log(`Candidate ${candidatesData['1'].Name} is randomly selected to go first (${winningInitiative} > ${losingInitiative})`)
  return candidatesData;
}

const alternateSlaps = (candidatesData) => {
  const candidate1MaxAttacks = candidatesData['1'].Attacks;
  const candidate2MaxAttacks = candidatesData['2'].Attacks;
  let attackCounter = 1;
  let winnerCandidate = 0;
  while (attackCounter <= candidate1MaxAttacks || attackCounter <= candidate2MaxAttacks) {
    if (attackCounter <= candidate1MaxAttacks) {
      candidate2NewHealth = candidatesData['2'].Health - candidatesData['1'].Damage;
      console.log(`Candidate ${candidatesData['1'].Name} hits candidate ${candidatesData['2'].Name} for ${candidatesData['1'].Damage} damage (${candidatesData['2'].Health} -> ${candidate2NewHealth})`);
      candidatesData['2'].Health = candidate2NewHealth;
    }

    winnerCandidate = findWinningCandidate(candidatesData['1'].Health, candidatesData['2'].Health);
    if (winnerCandidate) {
      break;
    }

    if (attackCounter <= candidate2MaxAttacks) {
      candidate1NewHealth = candidatesData['1'].Health - candidatesData['2'].Damage;
      console.log(`Candidate ${candidatesData['2'].Name} hits candidate ${candidatesData['1'].Name} for ${candidatesData['2'].Damage} damage (${candidatesData['1'].Health} -> ${candidate1NewHealth})`);
      candidatesData['1'].Health = candidate1NewHealth;
    }

    winnerCandidate = findWinningCandidate(candidatesData['1'].Health, candidatesData['2'].Health);
    if (winnerCandidate) {
      break;
    }

    attackCounter++;
  }
  return winnerCandidate;
}

const findWinningCandidate = (health1, health2) => {
  if (health1 <= 0 && health2 > 0) {
    return 2;
  } else if (health2 <= 0 && health1 > 0) {
    return 1;
  } else if (health1 <= 0 && health2 <= 0) {
    return 3
  } else {
    return 0;
  }
}

module.exports = { slapOff, findWinningApplicant };
