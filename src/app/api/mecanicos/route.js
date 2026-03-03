import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mecanicos = await prisma.mecanico.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(mecanicos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar mecânicos' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { nome } = body
    const mecanico = await prisma.mecanico.create({ data: { nome } })
    return NextResponse.json(mecanico, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar mecânico' }, { status: 500 })
  }
}