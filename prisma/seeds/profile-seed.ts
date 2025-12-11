import { faker } from '@faker-js/faker';

// Enum from your model
enum ContactMethods {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  IMO = 'IMO',
  TELEGRAM = 'TELEGRAM',
}

// Generate online contacts using your enum
const generateContacts = () => {
  const contactCount = faker.number.int({ min: 1, max: 3 });
  const contacts = [];

  for (let i = 0; i < contactCount; i++) {
    const method = faker.helpers.arrayElement(Object.values(ContactMethods));
    let value;

    switch (method) {
      case ContactMethods.WHATSAPP:
      case ContactMethods.IMO:
      case ContactMethods.TELEGRAM:
        value = faker.phone.number('+8801#########'); // simulate mobile contact
        break;
      case ContactMethods.EMAIL:
        value = faker.internet.email();
        break;
    }

    contacts.push({ method, value });
  }

  return contacts;
};

// Generate a single profile
const generateProfile = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  mobile: faker.phone.number('+8801#########'),
  address: faker.location.streetAddress(),
  avatar_id: faker.string.uuid(),
  online_contact: generateContacts(),
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
  employees: [],
  admins: [],
  customers: [],
  suppliers: [],
  doctor: [],
  pharmacist: []
});

// Example: generate 5 profiles
const profiles = Array.from({ length: 5 }, generateProfile);

console.log(JSON.stringify(profiles, null, 2));
