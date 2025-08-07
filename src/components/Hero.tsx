import React, { forwardRef } from "react";
import { Gift, Search, Bell } from "lucide-react"; // Ícones do lucide-react
import backgroundHero from '../assets/images/background.svg';
import scrollTo from '../assets/images/scroll.png';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-container">
      <div className="hero-background" style={{ backgroundImage: `url(${backgroundHero})` }} />
      <div className="hero-content">
        <div className="text-center">
          <h1 className="hero-heading">
            Encontre as melhores <span className="text-indigo-600">licitações</span> para seu negócio
          </h1>

          <p className="hero-subtitle">
            Acesso simplificado a milhares de oportunidades de licitações públicas.
            Economize tempo e encontre os melhores editais para sua empresa.
          </p>

          <div className="hero-buttons">
            <a href="#planos" className="hero-button-primary">
              Conhecer planos
            </a>
            <a href="#demo" className="hero-button-secondary">
              Testar grátis
            </a>
          </div>
        </div>
      </div>

      <div className="cards-section">
        <div className="cards-grid">
          {/* Card 1 */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon green">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="card-title">Plano Gratuito</h3>
            </div>
            <p className="card-description">
              Acesso básico a licitações com limite de buscas. Ideal para quem está começando.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon blue">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="card-title">Buscas Avançadas</h3>
            </div>
            <p className="card-description">
              Filtros poderosos para encontrar exatamente o que precisa. Salve suas pesquisas favoritas.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon purple">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="card-title">Alertas Personalizados</h3>
            </div>
            <p className="card-description">
              Receba notificações por e-mail quando novas licitações do seu interesse forem publicadas.
            </p>
          </div>
          <div>
          </div>
          <div className="scroll-to-content"><img src={scrollTo} alt="Scroll to content" /></div></div>

      </div>
    </div>
  );
};

export default Hero;