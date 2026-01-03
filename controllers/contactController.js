import Contact from "../models/Contact.js";

// POST Contact
export const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name & Phone required" });
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    message
  });

  res.status(201).json(contact);
};




// GET Contacts
export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};



// DELETE Contact  ✅ NEW
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.deleteOne();

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};
