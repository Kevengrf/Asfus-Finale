// backend/server.js
import express from 'express';
import cors from 'cors';

// Importa as rotas com a nova sintaxe
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import conveniosRoutes from './routes/convenios.js';
import eventsRoutes from './routes/events.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Integração das Rotas
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/convenios', conveniosRoutes);
app.use('/api/events', eventsRoutes);

app.get('/', (req, res) => {
  res.send('API do projeto ASFUS está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});