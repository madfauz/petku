import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient();

export default async function pembayaran() {
    const gopay = await prisma.metode_pembayaran.upsert({
        where: { id_metode_pembayaran: uuid().toString() },
        update: {},
        create: {
            nama: "Gopay",
            pajak: 750
        }
    });

    const shopeePay = await prisma.metode_pembayaran.upsert({
        where: { id_metode_pembayaran: uuid().toString() },
        update: {},
        create: {
          nama: "Shopee Pay",
          pajak: 800,
        },
      });
    
      const dana = await prisma.metode_pembayaran.upsert({
        where: { id_metode_pembayaran: uuid().toString() },
        update: {},
        create: {
          nama: "Dana",
          pajak: 950,
        },
      });
    
      const bca = await prisma.metode_pembayaran.upsert({
        where: { id_metode_pembayaran: uuid().toString() },
        update: {},
        create: {
          nama: "BCA",
          pajak: 1000,
        },
      });
    
      console.log("Payment method seeded");
}
