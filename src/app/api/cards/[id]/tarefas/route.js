import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const { descricao } = await request.json()

    const tarefa = await prisma.tarefa.create({
      data: { descricao, cardId: id },
    })

    return NextResponse.json(tarefa, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar tarefa' }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const { tarefaId, feita } = await request.json()

    const tarefa = await prisma.tarefa.update({
      where: { id: tarefaId },
      data: { feita },
    })

    return NextResponse.json(tarefa)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar tarefa' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const { tarefaId } = await request.json()

    await prisma.tarefa.delete({ where: { id: tarefaId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar tarefa' }, { status: 500 })
  }
}