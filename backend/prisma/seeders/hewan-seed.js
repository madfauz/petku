import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
// import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function hewan() {
  const pelanggans = await prisma.user.findMany({
    where: {
      role: "pelanggan",
    },
  })

  const mika = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[0].id_user,
      nama: 'nala',
      jenis_hewan: 'kucing',
    }
  })
  const komang = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[1].id_user,
      nama: 'boyen',
      jenis_hewan: 'kucing',
    }
  })
  const tulus = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[2].id_user,
      nama: 'mamih',
      jenis_hewan: 'hamster',
    }
  })
  const budi = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[3].id_user,
      nama: 'guna',
      jenis_hewan: 'anjing',
    }
  })
  const budi2 = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[4].id_user,
      nama: 'sukma',
      jenis_hewan: 'burung',
    }
  })
  const budi4 = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[5].id_user,
      nama: 'amoung',
      jenis_hewan: 'iguana',
    }
  })
  const budi5 = await prisma.hewan.upsert({
    where:{
      id_hewan: uuid().toString()
    },
    update: {},
    create: {
      id_pemilik: pelanggans[5].id_user,
      nama: 'wiwi',
      jenis_hewan: 'kelinci',
    }
  })


console.log('Hewan seeded')
}