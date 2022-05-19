const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { argv } = yargs(hideBin(process.argv));

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts();
      console.table(list);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      console.log(contactById);
      break;

    case "add":
      const contact = await contactsOperations.addContact(name, email, phone);
      console.log(contact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      console.log(removedContact);
      break;

    case "update":
      const updatedContact = await contactsOperations.updateById(
        id,
        name,
        email,
        phone
      );
      if (!updatedContact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      console.table(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
