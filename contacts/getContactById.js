const getAll = require("./getAll");

async function getContactById(contactId) {
  const contacts = await getAll();
  const contact = contacts.find((item) => item.id === Number(contactId));
  if (!contact) {
    return null;
  }
  return contact;
}

module.exports = getContactById;
