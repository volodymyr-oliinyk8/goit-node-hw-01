const getAll = require("./getAll");
const updateContactsList = require("./updateContactsList");

async function removeContact(contactId) {
  try {
    const contacts = await getAll();
    const idx = contacts.findIndex((item) => item.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter(
      (item) => item.id !== Number(contactId)
    );
    await updateContactsList(newContacts);
    const updatedList = await getAll();
    return updatedList;
  } catch (error) {
    throw error;
  }
}
module.exports = removeContact;
