"use client";


import Navigation from '../components/Navigation';
import styles from './About.module.css';
import Image from 'next/image';

export default function About({ navigateTo, isLoggedIn, user, onLogout }) {
  const skills = [
    { name: 'Next.js', level: 90, icon: '' },
    { name: 'HTML', level: 80, icon: '' },
    { name: 'Next.js', level: 85, icon: '' },
    { name: 'JavaScript', level: 95, icon: '' },
    { name: 'CSS', level: 90, icon: '' },
    { name: 'Node.js', level: 80, icon: '' },
    { name: 'PostgreSQL', level:  80, icon: '' },
    { name: 'TypeScript', level: 75, icon: '' },
    { name: 'React-Native', level: 65, icon: '' }
  ];

  const projects = [
    {
      name: 'TurboX Platform',
      description: 'Plataforma de simulação de carros turbo com React e Next.js',
      tech: ['React', 'Next.js', 'CSS Modules'],
      status: 'Em desenvolvimento'
    },
    {
      name: 'Portfolio Website',
      description: 'Portfólio pessoal para exibir projetos e habilidades',
      tech: ['HTML', 'CSS', 'JavaScript'],
      status: 'Concluído'
    },
    {
      name: 'Digital Card',
      description: 'Card digital interativo para contatos profissionais',
      tech: ['Next.js', 'Tailwind CSS', 'CSS'],
      status: 'Concluído'
    },
    {
      name: 'FunDev',
      description: 'Plataforma de aprendizado de programação com quizzes e desafios',
      tech: ['HTML', 'CSS', 'JavaScript'],
      status: 'Concluído'
    },
    {
      name: 'Playstation API',
      description: 'API para integração com o console Playstation',
      tech: ['Next.js', 'Tailwind CSS'],
      status: 'Concluído'
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      <Navigation 
        currentPage="about" 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={onLogout} 
      />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.profileSection}>
            <div className={styles.avatar}>
              <Image
                src="/images/foto.jpg"
                alt="Avatar Leonardo Oliveira"
                width={200}
                height={200}
                style={{ borderRadius: '50%' }}
                priority
              />
            </div>
            <div className={styles.introText}>
              <h1 className={styles.name}>Leonardo Oliveira</h1>
              <h2 className={styles.title}>Desenvolvedor Full Stack</h2>
              <p className={styles.subtitle}>
                Apaixonado por tecnologia e carros esportivos. Criador da TurboX.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>Sobre Mim</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                Sou Desenvolvedor Full Stack com experiência em criação de aplicações web completas, trabalhando com JavaScript, React, Node.js e PostgreSQL. Apaixonado por tecnologia, busco constantemente aprender novas ferramentas e aplicar soluções criativas que agreguem valor a projetos. Meu foco é contribuir para empresas e times que incentivem inovação e crescimento.
              </p>
              <p>
             Minha jornada na TI é guiada pelo aprendizado constante.
Cada projeto é uma oportunidade de crescer, dominar novas ferramentas e contribuir com soluções que façam a diferença.
              </p>
              <p>
              Mais do que escrever código, busco criar impacto através da tecnologia.
Acredito que cada aplicação pode simplificar a vida das pessoas e abrir portas para novas possibilidades.
              </p>
            </div>
            
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}></div>
                <div className={styles.highlightText}>
                  <h3>1+ Ano</h3>
                  <p>Experiência em desenvolvimento</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}></div>
                <div className={styles.highlightText}>
                  <h3>5 projetos Desenvolvidos</h3>
                  <p>Aplicações web desenvolvidas</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}></div>
                <div className={styles.highlightText}>
                  <h3>Paixão</h3>
                  <p>Por carros e tecnologia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.skills}>
          <h2 className={styles.sectionTitle}>Habilidades Técnicas</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillIcon}>{skill.icon}</span>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercent}>{skill.level}%</span>
                </div>
                <div className={styles.skillBar}>
                  <div 
                    className={styles.skillProgress}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.projects}>
          <h2 className={styles.sectionTitle}>Projetos Recentes</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectTech}>
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className={styles.projectStatus}>
                  <span className={styles.statusBadge}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>Vamos Conversar?</h2>
          <div className={styles.contactContent}>
            <p className={styles.contactText}>
              Interessado em colaborar ou tem algum projeto em mente? 
              Estou sempre aberto a novas oportunidades e desafios!
            </p>
            
            <div className={styles.contactLinks}>
              <a href="https://github.com/PedroLeoo07" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.contactIcon}></span>
                <span>GitHub</span>
              </a>
              
              <a href="https://linkedin.com" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.contactIcon}></span>
                <span>LinkedIn</span>
              </a>
              
              <a href="mailto:pedro@turbox.dev" className={styles.contactLink}>
                <span className={styles.contactIcon}></span>
                <span>Email</span>
              </a>
              
              <a href="https://turbox.dev" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.contactIcon}></span>
                <span>Portfólio</span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.backToApp}>
          <h2 className={styles.sectionTitle}>Explore a TurboX</h2>
          <div className={styles.appNavigation}>
            <button 
              onClick={() => navigateTo('home')}
              className={styles.navButton}
            >
              Voltar ao Início
            </button>
            <button 
              onClick={() => navigateTo('cars')}
              className={styles.navButton}
            >
              Ver Carros
            </button>
            <button 
              onClick={() => navigateTo('simulation')}
              className={styles.navButton}
            >
              Simulação
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

