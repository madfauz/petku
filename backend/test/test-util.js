import { prismaClient } from "../src/application/database.js";

export const removeTestUser = async () => {
    await prismaClient.pelanggan.deleteMany({
        where: {
            username: 'test'
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.pelanggan.create({
        data: {
            username: 'test',
            password: await bcrypt.hash('rahasia', 10),
            token: 'test'
        }
    })
}