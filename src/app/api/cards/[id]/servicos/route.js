import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const { descricao } = await request.json()

    const servico = await prisma.servico.create({
      data: { descricao, cardId: id },
    })

    return NextResponse.json(servico, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const { servicoId } = await request.json()

    await prisma.servico.delete({ where: { id: servicoId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar serviço' }, { status: 500 })
  }
}