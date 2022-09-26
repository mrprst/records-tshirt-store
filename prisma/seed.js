const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

  const tshirts = [
    {
      title: "Tshirt Amadou",
      price: 66,
      color: "GREEN",
      size: "M",
      description: "Tshirt Amadou Balake Green",
      imageUrl: "",
      providerId: 1,
      stock: 35
    },
  ];

  https: await prisma.tshirt.createMany({
    data: tshirts,
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });