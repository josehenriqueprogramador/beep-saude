import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, Legend, Area, AreaChart 
} from 'recharts';

function App() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://beep-app.onrender.com/api/dados')
      .then(res => setDados(res.data))
      .catch(err => console.error("Erro na API:", err));
  }, []);

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Beep Saúde | Central de Inteligência Operacional</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Gráfico 1: Composição de Pacientes (Adulto vs Criança) */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px' }}>
          <h3>Perfil de Pacientes por Hora</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: '#0f172a' }} />
              <Area type="monotone" dataKey="Pacientes_Crianca" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="Pacientes_Adulto" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 2: Eficiência e Volume (Vacinas vs Coletas) */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px' }}>
          <h3>Volume Operacional: Vacinas vs Coletas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: '#0f172a' }} />
              <Bar dataKey="Total_Vacinas" barSize={20} fill="#f59e0b" />
              <Line type="monotone" dataKey="Total_Coletas" stroke="#ef4444" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 3: Gargalo de Tempo */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', gridColumn: 'span 2' }}>
          <h3>Tempo Médio por Casa (min) vs Duplas Necessárias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke="#fff" />
              <YAxis yAxisId="left" stroke="#fff" />
              <YAxis yAxisId="right" orientation="right" stroke="#fff" />
              <Tooltip contentStyle={{ background: '#0f172a' }} />
              <Bar yAxisId="left" dataKey="Tempo_Medio_por_Casa_Min" fill="#3b82f6" />
              <Line yAxisId="right" type="monotone" dataKey="Duplas_Necessarias" stroke="#10b981" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default App;
