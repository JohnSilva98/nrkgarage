import { Car, Plus } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold flex items-center gap-2"><Car />NRK Garage</h1>
      <button className="bg-blue-400 hover:bg-blue-700 transition-all duration-400 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Plus /> Adicionar Veículo
      </button>

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
    </header>
  )
}

export default Header