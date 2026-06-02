import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, Area, AreaChart 
} from 'recharts';

function App() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://beep-app.onrender.com/api/dados')
      .then(res => setDados(res.data))
      .catch(err => console.error("Erro na API:", err));
  }, []);

  // Cores da Paleta
  const bgPagina = '#00b4a9'; // Pantone 326C
  const bgCard = '#0f172a';   // Azul Escuro para os gráficos
  const textoCor = '#ffffff'; // Branco para leitura

  return (
    <div style={{ padding: '20px', background: bgPagina, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>Beep Saúde | Central de Inteligência</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Gráfico 1 */}
        <div style={{ background: bgCard, padding: '20px', borderRadius: '15px' }}>
          <h3 style={{ color: textoCor }}>Perfil de Pacientes por Hora</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke={textoCor} />
              <YAxis stroke={textoCor} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: textoCor }} />
              <Area type="monotone" dataKey="Pacientes_Crianca" stackId="1" stroke="#86efac" fill="#86efac" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Pacientes_Adulto" stackId="1" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 2 */}
        <div style={{ background: bgCard, padding: '20px', borderRadius: '15px' }}>
          <h3 style={{ color: textoCor }}>Volume: Vacinas vs Coletas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke={textoCor} />
              <YAxis stroke={textoCor} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: textoCor }} />
              <Bar dataKey="Total_Vacinas" barSize={20} fill="#fbbf24" />
              <Line type="monotone" dataKey="Total_Coletas" stroke="#f87171" strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 3 */}
        <div style={{ background: bgCard, padding: '20px', borderRadius: '15px', gridColumn: 'span 2' }}>
          <h3 style={{ color: textoCor }}>Tempo Médio vs Duplas Necessárias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hora" stroke={textoCor} />
              <YAxis yAxisId="left" stroke={textoCor} />
              <YAxis yAxisId="right" orientation="right" stroke={textoCor} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: textoCor }} />
              <Bar yAxisId="left" dataKey="Tempo_Medio_por_Casa_Min" fill="#60a5fa" />
              <Line yAxisId="right" type="monotone" dataKey="Duplas_Necessarias" stroke="#34d399" strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
