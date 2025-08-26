import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';

const HomePage = () => {
  return (
    <div>
      <div className={styles.heroSection}>
        <div className={styles.carouselBackground}>
          <Carousel />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.ctaCard}>
            <h2>Venha Fazer Parte da Nossa Comunidade!</h2>
            <p>Associe-se e desfrute de todos os benefícios que a ASFUS oferece</p>
            <div className={styles.buttonGroup}>
              <Link to="/register" className={styles.ctaButton}>Seja um Associado</Link>
              <Link to="/associate" className={styles.directAccessButton}>Acesso Direto Associado</Link>
              <Link to="/admin/dashboard" className={styles.adminAccessButton}>Acesso Direto Admin</Link>
            </div>
          </div>
        </div>
      </div>
      
      <section className={styles.aboutSection}>
        <AnimatedSection>
          <h2 className={styles.sectionTitle}>Um Espaço de Lazer e União para a Família</h2>
          <p className={styles.aboutText}>
            A ASFUS é mais do que uma associação; é uma comunidade que valoriza o bem-estar e a integração de seus associados e suas famílias. Oferecemos um espaço seguro e acolhedor, com opções de lazer, eventos sociais e convênios que proporcionam tranquilidade e qualidade de vida.
          </p>
          <div className={styles.leisureFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎯</span>
              <h3>Atividades Recreativas</h3>
              <p>Diversas opções de lazer para todas as idades</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🏊‍♂️</span>
              <h3>Piscina e Esportes</h3>
              <p>Infraestrutura completa para prática esportiva</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎉</span>
              <h3>Eventos Sociais</h3>
              <p>Festejos e confraternizações regulares</p>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default HomePage;