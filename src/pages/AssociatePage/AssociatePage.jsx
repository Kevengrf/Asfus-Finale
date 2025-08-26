// src/pages/AssociatePage/AssociatePage.jsx
import React, { useState } from 'react';
import styles from './AssociatePage.module.css';

const AssociatePage = () => {
  const [associate] = useState({
    nome: 'Carlos Associado',
    email: 'carlos@example.com',
    cpf: '123.456.789-00',
    telefone: '(31) 99999-8888'
  });
  
  const [appointments] = useState([
    {
      id: 1,
      title: 'Aula de Natação',
      date: '2024-01-15',
      time: '14:00',
      location: 'Piscina ASFUS',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Festa de Aniversário',
      date: '2024-01-20',
      time: '19:00',
      location: 'Salão de Eventos',
      status: 'pending'
    }
  ]);
  
  const [dependents, setDependents] = useState([
    {
      id: 1,
      nome: 'Filho do Carlos',
      parentesco: 'Filho(a)',
      dataNascimento: '2015-05-20',
      telefone: '(31) 88888-7777'
    }
  ]);
  
  const [showAddDependent, setShowAddDependent] = useState(false);
  const [newDependent, setNewDependent] = useState({
    nome: '',
    parentesco: '',
    dataNascimento: '',
    telefone: ''
  });

  const handleAddDependent = (e) => {
    e.preventDefault();
    if (newDependent.nome && newDependent.parentesco && newDependent.dataNascimento) {
      const dependent = {
        id: Date.now(),
        ...newDependent
      };
      setDependents([...dependents, dependent]);
      setNewDependent({ nome: '', parentesco: '', dataNascimento: '', telefone: '' });
      setShowAddDependent(false);
    }
  };

  const handleRemoveDependent = (id) => {
    if (window.confirm('Tem certeza que deseja remover este dependente?')) {
      setDependents(dependents.filter(dep => dep.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className={styles.associateContainer}>
      <div className={styles.header}>
        <h1>Portal do Associado</h1>
        <p>Bem-vindo(a), {associate.nome}!</p>
      </div>

      <div className={styles.contentGrid}>
        {/* Seção de Agendamentos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📅 Meus Agendamentos</h2>
            <button className={styles.addButton}>+ Novo Agendamento</button>
          </div>
          
          {appointments.length === 0 ? (
            <div className={styles.emptyState}>
              <span>📅</span>
              <p>Nenhum agendamento encontrado</p>
            </div>
          ) : (
            <div className={styles.appointmentsList}>
              {appointments.map(appointment => (
                <div key={appointment.id} className={styles.appointmentCard}>
                  <div className={styles.appointmentHeader}>
                    <h3>{appointment.title}</h3>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(appointment.status) }}
                    >
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  <div className={styles.appointmentDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📅</span>
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🕐</span>
                      <span>{appointment.time}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📍</span>
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  <div className={styles.appointmentActions}>
                    <button className={styles.actionButton}>Editar</button>
                    <button className={styles.cancelButton}>Cancelar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seção de Dependentes */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>👥 Meus Dependentes</h2>
            <button 
              className={styles.addButton}
              onClick={() => setShowAddDependent(true)}
            >
              + Adicionar Dependente
            </button>
          </div>
          
          {dependents.length === 0 ? (
            <div className={styles.emptyState}>
              <span>👥</span>
              <p>Nenhum dependente cadastrado</p>
            </div>
          ) : (
            <div className={styles.dependentsList}>
              {dependents.map(dependent => (
                <div key={dependent.id} className={styles.dependentCard}>
                  <div className={styles.dependentAvatar}>
                    <span>{dependent.nome.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className={styles.dependentInfo}>
                    <h3>{dependent.nome}</h3>
                    <div className={styles.dependentDetails}>
                      <p><strong>Parentesco:</strong> {dependent.parentesco}</p>
                      <p><strong>Nascimento:</strong> {new Date(dependent.dataNascimento).toLocaleDateString()}</p>
                      {dependent.telefone && <p><strong>Telefone:</strong> {dependent.telefone}</p>}
                    </div>
                  </div>
                  <div className={styles.dependentActions}>
                    <button className={styles.editButton}>✏️</button>
                    <button 
                      className={styles.removeButton}
                      onClick={() => handleRemoveDependent(dependent.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para adicionar dependente */}
      {showAddDependent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Adicionar Novo Dependente</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowAddDependent(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddDependent}>
              <div className={styles.formGroup}>
                <label>Nome Completo *</label>
                <input
                  type="text"
                  value={newDependent.nome}
                  onChange={(e) => setNewDependent({...newDependent, nome: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Parentesco *</label>
                <select
                  value={newDependent.parentesco}
                  onChange={(e) => setNewDependent({...newDependent, parentesco: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Filho(a)">Filho(a)</option>
                  <option value="Cônjuge">Cônjuge</option>
                  <option value="Pai/Mãe">Pai/Mãe</option>
                  <option value="Irmão(ã)">Irmão(ã)</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Data de Nascimento *</label>
                <input
                  type="date"
                  value={newDependent.dataNascimento}
                  onChange={(e) => setNewDependent({...newDependent, dataNascimento: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input
                  type="tel"
                  value={newDependent.telefone}
                  onChange={(e) => setNewDependent({...newDependent, telefone: e.target.value})}
                  placeholder="(31) 99999-9999"
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddDependent(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociatePage;
