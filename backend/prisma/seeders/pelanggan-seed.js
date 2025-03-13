import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();



// export default async function pelanggan() {
//     const hashedPassword = await bcrypt.hash("1234567", 12);
  
//     const mika = await prisma.user.upsert({
//       where: { id_user: uuid().toString() },
//       update: {},
//       create: {
//         email: "mika@gmail.com",
//         password: hashedPassword,
//         username: "Mika Lestari",
//         role: "pelanggan",
//         pelanggan: {
//           create: {
//             kontak: "08123456789",
//           },
//         },
//       },
//     });

//     const budi = await prisma.user.upsert({
//         where: { id_user: uuid().toString() },
//         update: {},
//         create: {
//           email: "budi@gmail.com",
//           password: hashedPassword,
//           username: "Budi Setiawan",
//           role: "pelanggan",
//           pelanggan: {
//             create: {
//               kontak: "08123766789",
//             },
//           },
//         },
//       });

//       const komang = await prisma.user.upsert({
//         where: { id_user: uuid().toString() },
//         update: {},
//         create: {
//           email: "komang@gmail.com",
//           password: hashedPassword,
//           username: "komang lestari",
//           role: "pelanggan",
//           pelanggan: {
//             create: {
//               kontak: "08132966790",
//             },
//           },
//         },
//       });
//       const tulus = await prisma.user.upsert({
//         where: { id_user: uuid().toString() },
//         update: {},
//         create: {
//           email: "tulus@gmail.com",
//           password: hashedPassword,
//           username: "tulus sumbi",
//           role: "pelanggan",
//           pelanggan: {
//             create: {
//               kontak: "08129966790",
//             },
//           },
//         },
//       });
//       console.log("User seeded");
// }


export default async function pelanggan() {
  const pelanggans = await prisma.user.findMany({
    where: {
      role: "pelanggan",
    },
  });
  const mika = await prisma.pelanggan.upsert({
    where: {
      id_pelanggan: pelanggans[0].id_user
    },
    update: {
      alamat: 'kutabumi',
      kontak: '08123456789',
    },
    create: {},
  })
  const tulus  = await prisma.pelanggan.upsert({
    where: {
      id_pelanggan: pelanggans[1].id_user
    },
    update: {
      alamat: 'periuk',
      kontak: '08124458789',
    },
    create: {},
  })
  const budi  = await prisma.pelanggan.upsert({
    where: {
      id_pelanggan: pelanggans[2].id_user
    },
    update: {
      alamat: 'gelam',
      kontak: '08123458799',
    },
    create: {},
  })
  const budi2  = await prisma.pelanggan.upsert({
    where: {
      id_pelanggan: pelanggans[3].id_user
    },
    update: {
      alamat: 'karawaci',
      kontak: '08123458699',
    },
    create: {},
  })
  const budi3  = await prisma.pelanggan.upsert({
    where: {
      id_pelanggan: pelanggans[4].id_user
    },
    update: {
      alamat: 'bonang',
      kontak: '08123458710',
    },
    create: {},
  })
  const budi4  = await prisma.pelanggan.upsert({
    where: {
      id_pelanggan: pelanggans[5].id_user
    },
    update: {
      alamat: 'perum',
      kontak: '08145458799',
    },
    create: {},
  })
  console.log('pelanggan seeded')
}