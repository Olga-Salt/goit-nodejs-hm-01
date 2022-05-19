const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findedContact = contacts.find(
    (contact) => contact.id === `${contactId}`
  );
  if (!findedContact) {
    return null;
  }
  return findedContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = { id: v4(), name, email, phone };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
}

async function updateById(id, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === `${id}`);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: id.toString(), name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
  updateById,
};
