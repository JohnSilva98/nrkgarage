'use client'
import Header from '../components/header'
import ModalDetalhes from '../components/ModalDetalhes'

import { useState, useEffect, useCallback } from 'react'

const COLUNAS = [
  { key: 'CRIADO', label: 'Criado', cor: '#ef4444', corClara: '#fef2f2', corBorda: '#fecaca' },
  { key: 'AGUARDANDO_INICIO', label: 'Aguardando Início', cor: '#f59e0b', corClara: '#fffbeb', corBorda: '#fde68a' },
  { key: 'TRABALHANDO', label: 'Trabalhando', cor: '#3b82f6', corClara: '#eff6ff', corBorda: '#bfdbfe' },
  { key: 'AGUARDANDO_ENTREGA', label: 'Aguardando Entrega', cor: '#10b981', corClara: '#ecfdf5', corBorda: '#a7f3d0' },
]

function formatarTempo(dataISO) {
  const agora = new Date()
  const criado = new Date(dataISO)
  const diff = Math.floor((agora - criado) / 1000)
  const dias = Math.floor(diff / 86400)
  const horas = Math.floor((diff % 86400) / 3600)
  const minutos = Math.floor((diff % 3600) / 60)
  if (dias > 0) return `${dias}d ${horas}h`
  if (horas > 0) return `${horas}h ${minutos}m`
  return `${minutos}m`
}

function CardKanban ({ card, onMover, onDeletar, colunas, onAbrirDetalhes })  {
  const colAtual = colunas.findIndex(c => c.key === card.status)

  return (
    <div onClick={() => onAbrirDetalhes(card)}  className="bg-white dark:bg-gray-800 rounded-xl p-3.5 mb-2.5 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md hover:-translate-y-px cursor-pointer" 

      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className='flex-1'>
          <div className='text-sm text-black-500 mb-1'>
            <p>Mecânico: {card.mecanico?.nome || '—'}</p>
          </div>
          <div className='text-base font-bold text-primary tracking-tight'>
            {card.carro}
          </div>
          <div className='text-sm text-black-500 mt-1 flex flex-row'>
            <p>Cliente: {card.cliente || 'Cliente não especificado'}</p>
          </div>
        </div>
        <div className='bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold tracking-wider'>
          {card.placa}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4" >
        <div className='text-sm text-gray-500'>
          ⏱ {formatarTempo(card.createdAt)}
        </div>
        <div className='flex gap-1.5'>
          {colAtual > 0 && (
            <button onClick={(e) =>{e.stopPropagation(); onMover(card.id, colunas[colAtual - 1].key);}}
              style={{ background: 'var(--btn-secondary)', border: 'none', borderRadius: '5px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              ←
            </button>
          )}
          {colAtual < colunas.length - 1 && (
            <button onClick={(e) => {e.stopPropagation(); onMover(card.id, colunas[colAtual + 1].key);}}
              style={{ background: '#0f172a', border: 'none', borderRadius: '5px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', color: 'white' }}>
              →
            </button>
          )}
          <button onClick={(e) => {e.stopPropagation(); onDeletar(card.id);}}
            style={{ background: '#fee2e2', border: 'none', borderRadius: '5px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', color: '#ef4444' }}>
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

function ModalNovoCard({ mecanicos, onSalvar, onFechar }) {
  const [form, setForm] = useState({ carro: '', placa: '', cliente: '', mecanicoId: '', description: '' })
  const [salvando, setSalvando] = useState(false)

  const handleSalvar = async () => {
    if (!form.carro || !form.placa || !form.mecanicoId) return
    setSalvando(true)
    await onSalvar(form)
    setSalvando(false)
  }


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div style={{
        background: 'var(--card-bg)', borderRadius: '16px', padding: '32px',
        width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Novo Trabalho
        </h2>

        {[
          { label: 'Carro', key: 'carro', placeholder: 'Ex: VW/GOL 1.0' },
          { label: 'Placa', key: 'placa', placeholder: 'Ex: ABC1D23' },
          { label: 'Cliente', key: 'cliente', placeholder: 'Nome do cliente' },
        ].map(({ label, key, placeholder }) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              {label}
            </label>
            <input
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-600 text-sm outline-none box-border text-white bg-gray-700"
            />
          </div>
        ))}

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Mecânico
          </label>
          <select
            value={form.mecanicoId}
            onChange={e => setForm(f => ({ ...f, mecanicoId: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-600 text-sm outline-none box-border text-white bg-gray-700"
          >
            <option value="">Selecionar mecânico...</option>
            {mecanicos.map(m => (
              <option key={m.id} value={m.id}>{m.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Descrição do cliente:
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Descrição do cliente"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-600 text-sm outline-none box-border text-white bg-gray-700"
          />
        </div>

        <div className="flex gap-2.5">
          <button onClick={onFechar} style={{
            flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)',
            background: 'transparent', fontSize: '14px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: '600',
          }}>
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            disabled={salvando || !form.carro || !form.placa || !form.mecanicoId}
            style={{
              flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
              background: form.carro && form.placa && form.mecanicoId ? '#0f172a' : '#cbd5e1',
              fontSize: '14px', cursor: 'pointer', color: 'white', fontWeight: '600',
            }}
          >
            {salvando ? 'Salvando...' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [cards, setCards] = useState([])
  const [mecanicos, setMecanicos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [cardSelecionado, setCardSelecionado] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.style.setProperty('--bg', '#0f172a')
      root.style.setProperty('--card-bg', '#1e293b')
      root.style.setProperty('--card-border', '#334155')
      root.style.setProperty('--text-primary', '#f1f5f9')
      root.style.setProperty('--text-secondary', '#94a3b8')
      root.style.setProperty('--header-bg', '#1e293b')
      root.style.setProperty('--btn-secondary', '#334155')
      root.style.setProperty('--input-bg', '#0f172a')
    } else {
      root.style.setProperty('--bg', '#f8fafc')
      root.style.setProperty('--card-bg', '#ffffff')
      root.style.setProperty('--card-border', '#e2e8f0')
      root.style.setProperty('--text-primary', '#0f172a')
      root.style.setProperty('--text-secondary', '#64748b')
      root.style.setProperty('--header-bg', '#ffffff')
      root.style.setProperty('--btn-secondary', '#f1f5f9')
      root.style.setProperty('--input-bg', '#ffffff')
    }
  }, [darkMode])

  const buscarDados = useCallback(async () => {
    try {
      const [resCards, resMec] = await Promise.all([
        fetch('/api/cards'),
        fetch('/api/mecanicos'),
      ])
      const [dataCards, dataMec] = await Promise.all([resCards.json(), resMec.json()])
      setCards(dataCards)
      setMecanicos(dataMec)
    } catch (err) {
      console.error(err)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    buscarDados()
    const intervalo = setInterval(buscarDados, 30000)
    return () => clearInterval(intervalo)
  }, [buscarDados])

  const criarCard = async (form) => {
    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      await buscarDados()
      setModalAberto(false)
    }
  }

  const moverCard = async (id, novoStatus) => {
    await fetch(`/api/cards/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus }),
    })
    await buscarDados()
  }

  const deletarCard = async (id) => {
    if (!confirm('Remover este trabalho?')) return
    await fetch(`/api/cards/${id}`, { method: 'DELETE' })
    await buscarDados()
  }

  const cardsPorColuna = (status) => cards.filter(c => c.status === status)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }}>
      <style>{`
        * { box-sizing: border-box; }
        :root {
          --bg: #f8fafc; --card-bg: #ffffff; --card-border: #e2e8f0;
          --text-primary: #0f172a; --text-secondary: #64748b;
          --header-bg: #ffffff; --btn-secondary: #f1f5f9; --input-bg: #ffffff;
        }
      `}</style>

      {/* Header */}
      <header style={{
        background: 'var(--header-bg)',
        borderBottom: '1px solid var(--card-border)',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', background: '#0f172a',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '18px' }}>🔧</span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              NRK Garage
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              {cards.length} trabalho{cards.length !== 1 ? 's' : ''} ativo{cards.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              background: 'var(--btn-secondary)', border: 'none', borderRadius: '8px',
              padding: '8px 12px', cursor: 'pointer', fontSize: '16px', transition: 'background 0.3s',
            }}
            title="Alternar tema"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setModalAberto(true)}
            style={{
              background: '#0f172a', color: 'white', border: 'none',
              borderRadius: '8px', padding: '10px 18px', fontSize: '14px',
              fontWeight: '600', cursor: 'pointer',
            }}
          >
            + Novo Trabalho
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <main style={{ padding: '24px', overflowX: 'auto' }}>
        {carregando ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', fontSize: '16px' }}>
            Carregando...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))',
            gap: '16px',
            minWidth: '1100px',
          }}>
            {COLUNAS.map(coluna => {
              const cardsColuna = cardsPorColuna(coluna.key)
              return (
                <div key={coluna.key}>
                  <div style={{
                    background: coluna.cor,
                    borderRadius: '10px 10px 0 0',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>
                      {coluna.label}
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.25)', color: 'white',
                      borderRadius: '20px', padding: '2px 10px', fontSize: '13px', fontWeight: '700',
                    }}>
                      {cardsColuna.length}
                    </span>
                  </div>

                  <div style={{
                    background: darkMode ? '#1e293b' : coluna.corClara,
                    border: `1px solid ${darkMode ? '#334155' : coluna.corBorda}`,
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                    padding: '12px',
                    minHeight: '200px',
                    transition: 'background 0.3s',
                  }}>
                    {cardsColuna.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '32px 16px', color: '#cbd5e1', fontSize: '13px' }}>
                        Nenhum trabalho
                      </div>
                    ) : (
                      cardsColuna.map(card => (
                        <CardKanban
                          key={card.id}
                          card={card}
                          onMover={moverCard}
                          onDeletar={deletarCard}
                          colunas={COLUNAS}
                          onAbrirDetalhes={setCardSelecionado}
                        />
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {modalAberto && (
        <ModalNovoCard
          mecanicos={mecanicos}
          onSalvar={criarCard}
          onFechar={() => setModalAberto(false)}
        />
      )}

        {cardSelecionado && (
  <ModalDetalhes
    card={cardSelecionado}
    onFechar={() => setCardSelecionado(null)}
    onAtualizar={buscarDados}
    darkMode={darkMode}
  />
)}
    </div>
  )
}