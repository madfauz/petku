import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export default async function praktek() {
  const doctors = await prisma.user.findMany({
    where: {
      role: "dokter",
    },
  });

  const raden = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[0].id_user,
      harga: 80000,
      harga_promo: 70000,
      spesialis: JSON.stringify(["hamster"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const raden1 = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[1].id_user,
      harga: 80000,
      harga_promo: 70000,
      spesialis: JSON.stringify(["kelinci"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const kayla = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[2].id_user,
      harga: 84000,
      harga_promo: 71000,
      spesialis: JSON.stringify(["kucing"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const kayla1 = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[3].id_user,
      harga: 84000,
      harga_promo: 71000,
      spesialis: JSON.stringify(["kucing"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const fadli = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[4].id_user,
      harga: 64000,
      harga_promo: 51000,
      spesialis: JSON.stringify(["kucing"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const fadli2 = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[5].id_user,
      harga: 104000,
      harga_promo: 91000,
      spesialis: JSON.stringify(["iguana"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const fadli3 = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[6].id_user,
      harga: 124000,
      harga_promo: 101000,
      spesialis: JSON.stringify(["burung"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });
  const fadli4 = await prisma.praktek.upsert({
    where: { id_praktek: uuid().toString() },
    update: {},
    create: {
      id_dokter: doctors[7].id_user,
      harga: 84000,
      harga_promo: 71000,
      spesialis: JSON.stringify(["anjing"]),
      jadwal_waktu: JSON.stringify([
        {
          day: "Minggu",
          times: [{"start": "20:12", "end": "12:20"}]
        },
        {
          day: "Selasa",
          times: [{"start": "08:00", "end": "15:00"}]
        }
      ]),
      promo: true,
    },
  });

  console.log("Practices seeded");
}
