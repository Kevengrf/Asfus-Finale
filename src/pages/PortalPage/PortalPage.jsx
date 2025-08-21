// src/pages/PortalPage/PortalPage.jsx
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import styles from './PortalPage.module.css';

const PortalPage = () => {
  const { user } = useAuth();
  const [associado, setAssociado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar os dados do associado
  const fetchAssociadoData = async () => {
    try {
      setLoading(true);
      // O ID do usuário é pego do token decodificado
      const response = await apiService.get(`/associados/${user.id}`);
      setAssociado(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar os dados do associado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAssociadoData();
    }
  }, [user]);

  const handleAddDependente = async (dependenteData) => {
    try {
        // Lógica para adicionar dependente via API
        await apiService.post(`/associados/${user.id}/dependentes`, dependenteData);
        // Atualiza os dados na tela
        fetchAssociadoData(); 
        setIsModalOpen(false);
    } catch (err) {
        console.error("Erro ao adicionar dependente:", err);
        // Tratar erro na UI do modal
    }
  };

  const handleRemoveDependente = async (dependenteId) => {
    if (window.confirm("Tem certeza que deseja remover este dependente?")) {
        try {
            await apiService.delete(`/associados/${user.id}/dependentes/${dependenteId}`);
            fetchAssociadoData(); // Re-fetch
        } catch (err) {
            console.error("Erro ao remover dependente:", err);
            alert("Não foi possível remover o dependente.");
        }
    }
  };

  if (loading) return <p className={styles.loading}>Carregando portal...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!associado) return <p>Nenhum dado de associado encontrado.</p>;

  return (
    <div className={styles.portalContainer}>
      <h1 className={styles.welcome}>Bem-vindo(a) ao seu portal, {associado.nome}!</h1>

      <div className={styles.infoSection}>
        <h2>Seus Dados</h2>
        <p><strong>Email:</strong> {associado.email}</p>
        <p><strong>CPF:</strong> {associado.cpf}</p>
        <p><strong>Data de Nascimento:</strong> {new Date(associado.dataNascimento).toLocaleDateString()}</p>
        <p><strong>Telefone:</strong> {associado.telefone}</p>
      </div>

      <div className={styles.dependentsSection}>
        <div className={styles.dependentsHeader}>
            <h2>Seus Dependentes</h2>
            <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>Adicionar Dependente</button>
        </div>
        {associado.dependentes && associado.dependentes.length > 0 ? (
          <ul className={styles.dependentsList}>
            {associado.dependentes.map(dep => (
              <li key={dep.id} className={styles.dependenteItem}>
                <span><strong>Nome:</strong> {dep.nome}</span>
                <span><strong>Parentesco:</strong> {dep.parentesco}</span>
                <span><strong>Nascimento:</strong> {new Date(dep.dataNascimento).toLocaleDateString()}</span>
                <button onClick={() => handleRemoveDependente(dep.id)} className={styles.removeButton}>Remover</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Você não possui dependentes cadastrados.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Dependente">
        <AddDependenteForm onSubmit={handleAddDependente} />
      </Modal>
    </div>
  );
};

// Formulário para adicionar dependente (componente local)
const AddDependenteForm = ({ onSubmit }) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [parentesco, setParentesco] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nome, dataNascimento, parentesco });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome Completo" required />
            <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} placeholder="Data de Nascimento" required />
            <input type="text" value={parentesco} onChange={e => setParentesco(e.target.value)} placeholder="Parentesco" required />
            <button type="submit" className={styles.submitButton}>Adicionar</button>
        </form>
    )
}

export default PortalPage;
