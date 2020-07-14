const { slapOff2, findWinningApplicant } = require('./slap-robin-probability');
const { compileApplicantsData } = require('./compile-applicants-data');

const run = async () => {
    const applicantsData = await compileApplicantsData();
    const stats = slapOff2(applicantsData);
    // sum each player's percentage of winning
    const id = findWinningApplicant(stats);
    console.log(`The applicant with the highest percentage of wins is ${applicantsData[id].Name}`);
  }
run();