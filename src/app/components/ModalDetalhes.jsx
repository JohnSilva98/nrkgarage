'use client'
import Toastify from 'toastify-js'
import { useState } from 'react'

export default function ModalDetalhes({ card, onFechar, onAtualizar, darkMode }) {
  const [observacoes, setObservacoes] = useState(card.observacoes || '')
  const [salvandoObs, setSalvandoObs] = useState(false)
  const [novoServico, setNovoServico] = useState('')
  const [novaTarefa, setNovaTarefa] = useState('')
  const [servicos, setServicos] = useState(card.servicos || [])
  const [tarefas, setTarefas] = useState(card.tarefas || [])
  const [orcamento, setOrcamento] = useState(card.orcamento || '')

  const bg = darkMode ? '#1e293b' : 'white'
  const bgSec = darkMode ? '#0f172a' : '#f8fafc'
  const borda = darkMode ? '#334155' : '#e2e8f0'
  const tp = darkMode ? '#f1f5f9' : '#0f172a'
  const ts = darkMode ? '#94a3b8' : '#64748b'

  const salvarObservacoes = async () => {
    setSalvandoObs(true)
    await fetch(`/api/cards/${card.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ observacoes }),
    })
    setSalvandoObs(false)
    onAtualizar()
    Toastify({
      text: "Observações salvas com sucesso!",
      duration: 3000,
      close: true,
      transition: 'bounce',
      gravity: 'top',
      position: 'right',
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        width: "300px",
        borderRadius: "8px",
      },
    }).showToast();
    onFechar()
  }

  const adicionarServico = async () => {
    if (!novoServico.trim()) return
    const res = await fetch(`/api/cards/${card.id}/servicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao: novoServico }),
    })
    const data = await res.json()
    setServicos(s => [...s, data])
    setNovoServico('')
  }

  const deletarServico = async (servicoId) => {
    await fetch(`/api/cards/${card.id}/servicos`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servicoId }),
    })
    setServicos(s => s.filter(x => x.id !== servicoId))
  }

  const adicionarTarefa = async () => {
    if (!novaTarefa.trim()) return
    const res = await fetch(`/api/cards/${card.id}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao: novaTarefa }),
    })
    const data = await res.json()
    setTarefas(t => [...t, data])
    setNovaTarefa('')
  }

  const toggleTarefa = async (tarefaId, feita) => {
    await fetch(`/api/cards/${card.id}/tarefas`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tarefaId, feita: !feita }),
    })
    setTarefas(t => t.map(x => x.id === tarefaId ? { ...x, feita: !feita } : x))
  }

  const deletarTarefa = async (tarefaId) => {
    await fetch(`/api/cards/${card.id}/tarefas`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tarefaId }),
    })
    setTarefas(t => t.filter(x => x.id !== tarefaId))
  }

const handleOrcamentoChange = (e) => {
  const value = e.target.value.replace(/\D/g, '');

  if (!value) {
    setOrcamento('');
    return;
  }

  const numberValue = Number(value) / 100;

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);

  setOrcamento(formatted);
};

  const tarefasFeitas = tarefas.filter(t => t.feita).length
  const progresso = tarefas.length > 0 ? (tarefasFeitas / tarefas.length) * 100 : 0

  const labelStyle = {
    fontSize: '11px', fontWeight: '700', color: ts,
    textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px',
  }

  const inputStyle = {
    flex: 1, padding: '10px 14px', borderRadius: '8px',
    border: `1px solid ${borda}`, fontSize: '14px', outline: 'none',
    background: bgSec, color: tp,
  }

  const btnAdicionar = {
    background: '#0f172a', color: 'white', border: 'none',
    borderRadius: '8px', padding: '10px 16px', cursor: 'pointer',
    fontWeight: '700', fontSize: '16px',
  }

  const itemStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: bgSec, borderRadius: '8px', padding: '10px 14px',
    border: `1px solid ${borda}`, marginBottom: '6px',
  }

  const btnDeletar = {
    background: '#fee2e2', border: 'none', borderRadius: '5px',
    padding: '3px 8px', cursor: 'pointer', color: '#ef4444', fontSize: '11px', flexShrink: 0,
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && onFechar()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '24px',
      }}
    >
      <div style={{
        background: bg, borderRadius: '16px', width: '100%', maxWidth: '600px',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
      }}>

        {/* Header */}
        <div style={{
          padding: '24px', borderBottom: `1px solid ${borda}`,
          position: 'sticky', top: 0, background: bg, zIndex: 10,
          borderRadius: '16px 16px 0 0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '12px', color: ts, marginBottom: '4px' }}>
                <strong className='text-lg text-white'>Mecânico:</strong> {card.mecanico?.nome}
              </div>
              <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: tp, letterSpacing: '-0.5px' }}>
                <p className='text-lg'><strong>Carro:</strong> {card.carro}</p>
                <p className='text-lg'><strong>Placa:</strong> {card.placa}</p>
              </h2>
              <div style={{ fontSize: '14px', color: ts }}>
                <p><strong className='text-white'>Cliente:</strong> {card.cliente}</p>
              </div>
            </div>
            <button onClick={onFechar} style={{
              background: bgSec, border: 'none', borderRadius: '8px',
              padding: '8px 12px', cursor: 'pointer', fontSize: '16px', color: ts,
            }}>✕</button>
          </div>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Descrição do cliente */}
          {card.descricaoCliente && (
            <div>
              <div style={labelStyle}>Descrição do Cliente</div>
              <div style={{
                background: bgSec, borderRadius: '10px', padding: '14px',
                fontSize: '14px', color: tp, lineHeight: '1.6', border: `1px solid ${borda}`,
              }}>
                {card.descricaoCliente}
              </div>
            </div>
          )}

          {/* Serviços / Peças */}
          <div>
            <div style={labelStyle}>Serviços / Peças</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                value={novoServico}
                onChange={e => setNovoServico(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && adicionarServico()}
                placeholder="Ex: Troca de óleo, Pastilha de freio..."
                style={inputStyle}
              />
              <button onClick={adicionarServico} style={btnAdicionar}>+</button>
            </div>
            {servicos.length === 0
              ? <div style={{ fontSize: '13px', color: ts, textAlign: 'center', padding: '12px' }}>Nenhum serviço adicionado</div>
              : servicos.map(s => (
                <div key={s.id} style={itemStyle}>
                  <span style={{ fontSize: '14px', color: tp }}>🔩 {s.descricao}</span>
                  <button onClick={() => deletarServico(s.id)} style={btnDeletar}>✕</button>
                </div>
              ))
            }
          </div>

         

          {/* Observações */}
          <div>
            <div style={labelStyle}>Observações do Mecânico</div>
            <textarea
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              placeholder="Anotações, diagnósticos, observações..."
              rows={4}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: '8px',
                border: `1px solid ${borda}`, fontSize: '14px', outline: 'none',
                background: bgSec, color: tp, resize: 'vertical',
                fontFamily: 'inherit', lineHeight: '1.6', boxSizing: 'border-box',
              }}
            />
            {/* campo do valor de orçamento */}
            <div>
              <div style={labelStyle}>Valor de Orçamento</div>
              <input
                type="text"
                value={orcamento}
                onChange={handleOrcamentoChange}
                placeholder="0.00"
                style={inputStyle}
              />
            </div>

            <button
              onClick={salvarObservacoes}
              disabled={salvandoObs}
              style={{
                marginTop: '8px', background: '#0f172a', color: 'white', border: 'none',
                borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
                fontWeight: '600', cursor: 'pointer', opacity: salvandoObs ? 0.7 : 1,
              }}
            >
              {salvandoObs ? 'Salvando...' : 'Salvar Observações'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}