const fs = require("fs/promises");

const contactsPath = require("./contactsPath");

async function getAll() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contacts);
    return contactList;
  } catch (error) {
    throw error;
  }
}
module.exports = getAll;
