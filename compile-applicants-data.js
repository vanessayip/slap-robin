const csvtojson = require('csvtojson');
const filePath = './data/applicants.csv';

const compileApplicantsData = async () => {
  const applicantsData = await csvtojson().fromFile(filePath);
  // TODO ensure there's no empty data
  for (let i = 0; i < applicantsData.length; i++) {
    applicantsData[i].Id = i;
  }
  
  return applicantsData;
}

module.exports = { compileApplicantsData };