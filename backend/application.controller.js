const Application = require("./models/Application");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");

async function addApplication(name, telephone, description) {
  await Application.create({ name, telephone, description });
}

async function getApplications() {
  const applications = await Application.find();

  return applications;
}

module.exports = {
  addApplication,
  getApplications,
};
