// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h4>Sobre a ASFUS</h4>
          <p>Associação dos Funcionários da Saúde de Sete Lagoas, dedicada a oferecer os melhores benefícios e convênios para nossos associados.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Contato</h4>
          <p><strong>Endereço:</strong> Rua Laurentino Gomes, s/n - Gaibu, Cabo de Santo Agostinho - PE, 54500-992.</p>
          <p><strong>Telefone:</strong> (81) 3512-0735</p>
          <p><strong>WhatsApp:</strong> (81) 99999-9999</p>
          <p><strong>Email:</strong> contato@asfus.com.br</p>
          <p><strong>Horário de Funcionamento:</strong> Segunda a Sexta, 8h às 18h</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Redes Sociais</h4>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} ASFUS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;