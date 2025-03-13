import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function dokter() {
  const doctors = await prisma.user.findMany({
    where: {
      role: "dokter",
    },
  });
  const raden = await prisma.dokter.upsert({
    where: { id_dokter: doctors[0].id_user },
    update: {
      nama_klinik: "Klinik Arya medika",
      pengalaman: 4,
      alamat: "Jl. Pahlawan No. 6",
    },
    create: {},
  });
  const raden1 = await prisma.dokter.upsert({
    where: { id_dokter: doctors[1].id_user },
    update: {
      nama_klinik: "Klinik Arya medika",
      pengalaman: 4,
      alamat: "Jl. Pahlawan No. 6",
    },
    create: {},
  });
  const kayla = await prisma.dokter.upsert({
    where: { id_dokter: doctors[2].id_user },
    update: {
      nama_klinik: "Klinik Dian Kencana",
      pengalaman: 5,
      alamat: "Jl. Citra Karya No. 2",
    },
    create: {},
  });
  const kayla1 = await prisma.dokter.upsert({
    where: { id_dokter: doctors[3].id_user },
    update: {
      nama_klinik: "Klinik Dian Kencana",
      pengalaman: 5,
      alamat: "Jl. Citra Karya No. 2",
    },
    create: {},
  });
  const fadli = await prisma.dokter.upsert({
    where: { id_dokter: doctors[4].id_user },
    update: {
      nama_klinik: "Klinik Hermina Nagrak",
      pengalaman: 5,
      alamat: "Jl. Citra Karya No. 3",
    },
    create: {},
  });
  const fadli2 = await prisma.dokter.upsert({
    where: { id_dokter: doctors[5].id_user },
    update: {
      nama_klinik: "Klinik Hermina Nagrak",
      pengalaman: 5,
      alamat: "Jl. Citra Karya No. 4",
    },
    create: {},
  });
  const fadli3 = await prisma.dokter.upsert({
    where: { id_dokter: doctors[3].id_user },
    update: {
      nama_klinik: "Klinik Annisa Karawaci",
      pengalaman: 5,
      alamat: "Jl. Citra Karya No. 5",
    },
    create: {},
  });
  const fadli4 = await prisma.dokter.upsert({
    where: { id_dokter: doctors[6].id_user },
    update: {
      nama_klinik: "Klinik Annisa Karawaci",
      pengalaman: 5,
      alamat: "Jl. Citra Karya No. 6",
    },
    create: {},
  });
  console.log("Doctor seeded");
}
