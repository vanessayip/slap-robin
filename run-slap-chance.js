const { slapOff, findWinningApplicant } = require('./slap-robin-chance');
const { compileApplicantsData } = require('./compile-applicants-data');

const run = async () => {
    applicantsData = await compileApplicantsData();
    const wins = slapOff(applicantsData);
    const applicantId = findWinningApplicant(wins);
    console.log(`The applicant with the highest number of wins is ${applicantsData[applicantId].Name}`);
  }

run();