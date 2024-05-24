npx prisma generate
npx prisma migrate dev --name [description]

If you have added a model to your Prisma schema and you want to create default preferences for all existing users, you can perform the following steps:

npx prisma migrate save --name [description]
npx prisma migrate up

Set Default Preferences for Existing Users: sample code

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function setDefaultPreferences() {
try {
const users = await prisma.user.findMany();
const defaultPreferences = { age: ['18-24'] }; // Set your default preferences

    for (const user of users) {
      await prisma.preference.create({
        data: {
          age: defaultPreferences.age,
          user: { connect: { id: user.id } },
        },
      });
    }

    console.log('Default preferences set for all users.');

} catch (error) {
console.error('Error setting default preferences:', error);
} finally {
await prisma.$disconnect();
}
}

setDefaultPreferences();

Run the Script:

node set-default-preferences.js
