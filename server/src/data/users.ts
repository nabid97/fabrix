import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@fabrix.com',
    password: bcrypt.hashSync('password123', 10),
    isAdmin: true,
    phone: '555-123-4567',
    company: 'FabriX Inc.',
    addresses: [
      {
        address1: '123 Admin Street',
        city: 'Silicon Valley',
        state: 'CA',
        zipCode: '94025',
        country: 'US',
        isDefault: true
      }
    ]
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    isAdmin: false,
    phone: '555-234-5678',
    addresses: [
      {
        address1: '456 Main St',
        address2: 'Apt 7B',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11201',
        country: 'US',
        isDefault: true
      }
    ]
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password123', 10),
    isAdmin: false,
    phone: '555-345-6789',
    company: 'Fashion Trends LLC',
    addresses: [
      {
        address1: '789 Fashion Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90015',
        country: 'US',
        isDefault: true
      },
      {
        address1: '101 Business Rd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90017',
        country: 'US',
        isDefault: false
      }
    ]
  }
];

export default users;