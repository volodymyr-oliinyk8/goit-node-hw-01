const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contacts);
    return contactList;
  } catch (error) {
    throw error;
  }
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === Number(contactId));
  if (!contact) {
    return null;
  }
  return contact;
}
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter(
      (item) => item.id !== Number(contactId)
    );
    await updateContactsList(newContacts);
    const updatedList = await listContacts();
    return updatedList;
  } catch (error) {
    throw error;
  }
}
async function updateContactsList(newList) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newList));
  } catch (error) {
    throw error;
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const allContactsId = contacts.map((item) => item.id);
    const sortId = allContactsId.sort((a, b) => a - b);
    const maxId = sortId[sortId.length - 1];
    const newId = maxId + 1;
    const newContact = {
      id: newId,
      name,
      email,
      phone,
    };
    const newContactsList = [...contacts, newContact];
    await updateContactsList(newContactsList);
    const updateList = await listContacts();
    return updateList;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
