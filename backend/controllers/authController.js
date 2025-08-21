// backend/controllers/authController.js

const users = [
  { id: 1, email: 'admin@asfus.com.br', password: 'adminpassword', role: 'admin', nome: 'Admin Mestre' },
  { id: 2, email: 'associado@asfus.com.br', password: 'associadopassword', role: 'associado', nome: 'Carlos Associado', cpf: '123.456.789-00', dataNascimento: '1990-01-15', telefone: '(31) 99999-8888', dependentes: [{ id: 10, nome: 'Filho do Carlos', parentesco: 'Filho(a)', dataNascimento: '2015-05-20' }] }
];
let nextUserId = 3;

const generateToken = (user) => {
  const payload = { id: user.id, nome: user.nome, isAdmin: user.role === 'admin' };
  const header = { alg: 'HS256', typ: 'JWT' };
  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signature = 'mock-signature';
  return `${base64Header}.${base64Payload}.${signature}`;
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password && u.role === 'associado');
  if (!user) return res.status(401).json({ message: 'Email ou senha de associado inválidos.' });
  const token = generateToken(user);
  res.json({ token });
};

export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password && u.role === 'admin');
  if (!user) return res.status(401).json({ message: 'Email ou senha de administrador inválidos.' });
  const token = generateToken(user);
  res.json({ token });
};

export const register = (req, res) => {
  const { nome, email, senha, cpf, dataNascimento, telefone, dependentes } = req.body;
  const existingUser = users.find(u => u.email === email || u.cpf === cpf);
  if (existingUser) return res.status(400).json({ message: 'Email ou CPF já cadastrado.' });
  const newUser = { id: nextUserId++, email, password: senha, role: 'associado', nome, cpf, dataNascimento, telefone, dependentes: dependentes || [] };
  users.push(newUser);
  res.status(201).json({ message: 'Pré-cadastro realizado com sucesso! Aguarde aprovação.' });
};