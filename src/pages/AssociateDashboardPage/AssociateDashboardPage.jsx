import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import useAuth from '../../hooks/useAuth';
import styles from './AssociateDashboardPage.module.css';

const AssociateDashboardPage = () => {
  const { user } = useAuth();
  const [dependentes, setDependentes] = useState([]);
  const [newDependente, setNewDependente] = useState({ nome: '', dataNascimento: '', parentesco: '' });
  const [editingDependente, setEditingDependente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.id) {
      fetchDependentes();
    }
  }, [user]);

  const fetchDependentes = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/associados/${user.id}/dependentes`);
      setDependentes(response.data);
    } catch (err) {
      setError('Não foi possível carregar os dependentes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDependente) {
      setEditingDependente({ ...editingDependente, [name]: value });
    } else {
      setNewDependente({ ...newDependente, [name]: value });
    }
  };

  const handleAddOrUpdateDependente = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingDependente) {
        await apiService.put(`/associados/${user.id}/dependentes/${editingDependente.id}`, editingDependente);
        setEditingDependente(null);
      } else {
        await apiService.post(`/associados/${user.id}/dependentes`, newDependente);
        setNewDependente({ nome: '', dataNascimento: '', parentesco: '' });
      }
      fetchDependentes();
    } catch (err) {
      setError('Falha ao salvar dependente.');
      console.error(err);
    }
  };

  const handleDeleteDependente = async (dependenteId) => {
    if (window.confirm('Tem certeza que deseja remover este dependente?')) {
      try {
        await apiService.delete(`/associados/${user.id}/dependentes/${dependenteId}`);
        fetchDependentes();
      } catch (err) {
        setError('Falha ao remover dependente.');
        console.error(err);
      }
    }
  };

  const startEditing = (dependente) => {
    setEditingDependente({ ...dependente });
  };

  const cancelEditing = () => {
    setEditingDependente(null);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Bem-vindo, {user?.nome || 'Associado'}!</h1>

      <section className={styles.section}>
        <h2>Meus Agendamentos</h2>
        {/* Placeholder for appointments */}
        <p>Nenhum agendamento futuro.</p>
      </section>

      <section className={styles.section}>
        <h2>Meus Dependentes</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <form onSubmit={handleAddOrUpdateDependente} className={styles.form}>
          <h3>{editingDependente ? 'Editar Dependente' : 'Adicionar Novo Dependente'}</h3>
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={editingDependente ? editingDependente.nome : newDependente.nome}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="dataNascimento"
            placeholder="Data de Nascimento"
            value={editingDependente ? editingDependente.dataNascimento : newDependente.dataNascimento}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="parentesco"
            placeholder="Parentesco (Ex: Filho(a), Cônjuge)"
            value={editingDependente ? editingDependente.parentesco : newDependente.parentesco}
            onChange={handleInputChange}
            required
          />
          <div className={styles.formActions}>
            <button type="submit" className={styles.button}>{editingDependente ? 'Salvar Alterações' : 'Adicionar Dependente'}</button>
            {editingDependente && <button type="button" onClick={cancelEditing} className={`${styles.button} ${styles.cancelButton}`}>Cancelar</button>}
          </div>
        </form>

        {loading ? (
          <p>Carregando dependentes...</p>
        ) : dependentes.length > 0 ? (
          <div className={styles.dependentesGrid}>
            {dependentes.map(dep => (
              <div key={dep.id} className={styles.dependenteCard}>
                <p><strong>Nome:</strong> {dep.nome}</p>
                <p><strong>Nascimento:</strong> {dep.dataNascimento}</p>
                <p><strong>Parentesco:</strong> {dep.parentesco}</p>
                <div className={styles.cardActions}>
                  <button onClick={() => startEditing(dep)} className={`${styles.button} ${styles.editButton}`}>Editar</button>
                  <button onClick={() => handleDeleteDependente(dep.id)} className={`${styles.button} ${styles.deleteButton}`}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum dependente cadastrado.</p>
        )}
      </section>
    </div>
  );
};

export default AssociateDashboardPage;
