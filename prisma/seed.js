const { prisma, disconnect } = require("../lib/prisma");
const { tenants } = require("../utils/tenants");

// Convert tenant names to URLs
function convertToJsonEndpoint(jsonData) {
  const urls = [];

  Object.entries(jsonData).forEach(([category, items]) => {
    items.forEach((item) => {
      const itemUrl = `${item.toLowerCase().replace(/\s+/g, "-")}`;
      urls.push({ name: item, url: itemUrl, category });
    });
  });

  return urls;
}

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function main() {
  // Remove all existing data from the Tenant model
  await prisma.tenant.deleteMany();

  // Convert tenant data to JSON endpoint format
  const tenantData = convertToJsonEndpoint(tenants);

  // Insert tenant records into the database
  for (const tenant of tenantData) {
    const randomCode = generateRandomCode();
    await prisma.tenant.create({
      data: {
        name: tenant.name,
        url: btoa(tenant.url),
        category: tenant.category,
        code: randomCode,
      },
    });
  }

  console.log("Tenant seeding completed.");
}

main()
  .catch((error) => {
    console.error("Error seeding tenants:", error);
  })
  .finally(async () => {
    await disconnect(prisma);
  });
