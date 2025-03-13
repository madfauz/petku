import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function user() {
  const hashedPassword = await bcrypt.hash("1234567", 12);

  const mika = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "mika@gmail.com",
      password: hashedPassword,
      username: "Mika Lestari",
      role: "pelanggan",
      pelanggan: {
        create: {
          kontak: "08123456789",
        },
      },
    },
  });
  const budi = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "budi@gmail.com",
      password: hashedPassword,
      username: "Budi Setiawan",
      role: "pelanggan",
      pelanggan: {
        create: {
          kontak: "08123766789",
        },
      },
    },
  });

  const raden = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "raden@gmail.com",
      password: hashedPassword,
      username: "Raden Wijaya",
      role: "dokter",
      dokter: {
        create: {
          kontak: "08123456790",
        },
      },
    },
  });
  const kayla = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "kayla@gmail.com",
      password: hashedPassword,
      username: "Kayla Anggraini",
      role: "dokter",
      dokter: {
        create: {
          kontak: "08123966790",
        },
      },
    },
  });

  const arif = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "arif@gmail.com",
      password: hashedPassword,
      username: "arif nugraha",
      role: "dokter",
      dokter: {
        create: {
          kontak: "081239411790",
        },
      },
    },
  });
 
  const anja = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "anja@gmail.com",
      password: hashedPassword,
      username: "anja kaesang",
      role: "dokter",
      dokter: {
        create: {
          kontak: "08123966290",
        },
      },
    },
  });
  const abdan = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "abdan@gmail.com",
      password: hashedPassword,
      username: "abdan syakura",
      role: "dokter",
      dokter: {
        create: {
          kontak: "086231919190",
        },
      },
    },
  });
  const imam = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "imam@gmail.com",
      password: hashedPassword,
      username: "imam tirmdzi",
      role: "dokter",
      dokter: {
        create: {
          kontak: "086232719190",
        },
      },
    },
  });
  const abu = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "abu@gmail.com",
      password: hashedPassword,
      username: "abu dawud",
      role: "dokter",
      dokter: {
        create: {
          kontak: "086232719122",
        },
      },
    },
  });
  const sunan = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "sunan@gmail.com",
      password: hashedPassword,
      username: "sunan nasai",
      role: "dokter",
      dokter: {
        create: {
          kontak: "086232724522",
        },
      },
    },
  });
  const komang = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "komang@gmail.com",
      password: hashedPassword,
      username: "komang lestari",
      role: "pelanggan",
      pelanggan: {
        create: {
          kontak: "08132966790",
        },
      },
    },
  });
  const tulus = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "tulus@gmail.com",
      password: hashedPassword,
      username: "tulus sumbi",
      role: "pelanggan",
      pelanggan: {
        create: {
          kontak: "08129966790",
        },
      },
    },
  });
  const tulus2 = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "karim@gmail.com",
      password: hashedPassword,
      username: "karim albataki",
      role: "pelanggan",
      pelanggan: {
        create: {
          kontak: "08129966788",
        },
      },
    },
  });
  const tulus3 = await prisma.user.upsert({
    where: { id_user: uuid().toString() },
    update: {},
    create: {
      email: "indah@gmail.com",
      password: hashedPassword,
      username: "indah sari",
      role: "pelanggan",
      pelanggan: {
        create: {
          kontak: "08129966778",
        },
      },
    },
  });
  console.log("User seeded");



}
