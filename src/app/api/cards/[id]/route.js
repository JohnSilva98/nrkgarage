import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    console.log("ID:", id)
    console.log("BODY:", body)
    const card = await prisma.card.update({
      where: { id },
      data: { ...body,},
      include: { mecanico: true, servicos: true, tarefas: true },
      
    })
    if (body.observacoes !== undefined) data.observacoes = body.observacoes
    console.log(body)
    return NextResponse.json(card)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar card' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await prisma.servico.deleteMany({ where: { cardId: id } })
    await prisma.card.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar card' }, { status: 500 })
  }
}