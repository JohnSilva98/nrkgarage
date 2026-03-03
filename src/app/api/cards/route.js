import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cards = await prisma.card.findMany({
      include: { mecanico: true, servicos: true },
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(cards)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar cards' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { carro, placa, cliente, mecanicoId } = await request.json()
    const card = await prisma.card.create({
      data: { carro, placa, cliente, mecanicoId },
      include: { mecanico: true, servicos: true },
    })
    return NextResponse.json(card, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar card' }, { status: 500 })
  }
}