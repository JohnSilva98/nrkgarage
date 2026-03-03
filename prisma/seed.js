require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('../src/generated/prisma')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const mecanicos = [
    'Roberto Sousa',
    'Jonathan Oliveira',
    'Marcos Santos',
    'Anderson Silva',
    'Guilherme Santos',
    'Jonas Costa',
    'João Pereira',
    'Bruno Silva'
  ]

  for (const nome of mecanicos) {
    await prisma.mecanico.create({
      data: { nome },
    })
  }

  console.log('Mecânicos cadastrados!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())