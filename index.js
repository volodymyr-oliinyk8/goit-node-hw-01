const contactsOperations = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.getAll();
      console.table(contacts);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        console.log(`Контакт с id-${id} не найден`);
      }
      console.table(contact);
      break;
    case "add":
      if (!name || !email || !phone) {
        console.log("Нужно ввести name, email, phone");
      }
      const newContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.log(`Контакт ${name} добавлен!`);
      console.table(newContact);
      break;

    case "remove":
      const newList = await contactsOperations.removeContact(id);
      console.log(`Контакт с индексом ${id} удалён!`);
      console.table(newList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
