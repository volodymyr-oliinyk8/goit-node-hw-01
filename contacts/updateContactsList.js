const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

async function updateContactsList(newList) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newList));
  } catch (error) {
    throw error;
  }
}

module.exports = updateContactsList;
