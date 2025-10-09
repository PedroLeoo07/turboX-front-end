"use client";

import { useState } from 'react';
import Navigation from '../components/Navigation';
import styles from './Blog.module.css';

const blogPosts = [
  {
    id: 1,
    title: 'Golf R MK8: A Nova Era do Hot Hatch Alemão',
    category: 'Lançamentos',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    excerpt: 'Volkswagen apresenta a nova geração do Golf R com 320cv e tecnologia de ponta...',
    content: 'O novo Golf R MK8 chega ao mercado com um motor 2.0 TSI de 320cv e 420Nm de torque, capaz de acelerar de 0 a 100 km/h em apenas 4,7 segundos.',
    date: '2025-10-08',
    author: 'TurboX Team',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Como Preparar seu Carro para Track Day',
    category: 'Preparação',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    excerpt: 'Dicas essenciais para levar seu carro à pista com segurança e performance...',
    content: 'Preparar um carro para track day requer atenção especial aos freios, pneus, fluidos e suspensão. Veja nossa lista completa de verificações.',
    date: '2025-10-07',
    author: 'Pedro Oliveira',
    readTime: '8 min'
  },
  {
    id: 3,
    title: 'Turbinando o Motor: Guia Completo',
    category: 'Tuning',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    excerpt: 'Tudo que você precisa saber sobre turboalimentação e como extrair mais potência...',
    content: 'A instalação de um turbo pode aumentar significativamente a potência do motor, mas requer cuidados com preparação interna e gerenciamento eletrônico.',
    date: '2025-10-06',
    author: 'Marcos Silva',
    readTime: '12 min'
  },
  {
    id: 4,
    title: 'BMW M3 vs Mercedes AMG C63: O Duelo',
    category: 'Comparativos',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    excerpt: 'Duas lendas alemãs frente a frente. Qual é o melhor sedan esportivo?',
    content: 'Comparamos os dois sedãs esportivos mais desejados do mercado premium. Performance, luxo e emoção em cada detalhe.',
    date: '2025-10-05',
    author: 'TurboX Team',
    readTime: '10 min'
  },
  {
    id: 5,
    title: 'Aerodinâmica: Como Melhorar a Performance',
    category: 'Técnico',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    excerpt: 'Entenda como modificações aerodinâmicas podem transformar seu carro...',
    content: 'Splitters, difusores e spoilers não são apenas estéticos. Descubra como melhorar a aderência e velocidade com aerodinâmica.',
    date: '2025-10-04',
    author: 'Carlos Mendes',
    readTime: '7 min'
  },
  {
    id: 6,
    title: 'Os Melhores Pneus para Performance 2025',
    category: 'Reviews',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    excerpt: 'Testamos os principais pneus de alta performance do mercado...',
    content: 'Michelin Pilot Sport 5, Pirelli P Zero e Continental ExtremeContact Sport 02 foram testados em diversas condições.',
    date: '2025-10-03',
    author: 'Rafael Costa',
    readTime: '6 min'
  }
];

export default function Blog({ navigateTo, isLoggedIn, user, onLogout }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Lançamentos', 'Preparação', 'Tuning', 'Comparativos', 'Técnico', 'Reviews'];

  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className={styles.container}>
        <Navigation 
          currentPage="blog" 
          navigateTo={navigateTo}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={onLogout}
        />

        <main className={styles.articlePage}>
          <button onClick={handleBackToBlog} className={styles.backButton}>
            ← Voltar ao Blog
          </button>

          <article className={styles.article}>
            <div className={styles.articleHeader}>
              <span className={styles.articleCategory}>{selectedPost.category}</span>
              <h1 className={styles.articleTitle}>{selectedPost.title}</h1>
              <div className={styles.articleMeta}>
                <span>Por {selectedPost.author}</span>
                <span>•</span>
                <span>{new Date(selectedPost.date).toLocaleDateString('pt-BR')}</span>
                <span>•</span>
                <span>{selectedPost.readTime} de leitura</span>
              </div>
            </div>

            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className={styles.articleImage}
            />

            <div className={styles.articleContent}>
              <p className={styles.excerpt}>{selectedPost.excerpt}</p>
              <p>{selectedPost.content}</p>
              
              <h2>Conclusão</h2>
              <p>Este é um exemplo de artigo do blog TurboX. Em uma implementação completa, este conteúdo viria de um CMS ou banco de dados com texto completo formatado.</p>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navigation 
        currentPage="blog" 
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Blog TurboX</h1>
          <p className={styles.subtitle}>
            Notícias, preparações e tudo sobre o mundo automotivo de alta performance
          </p>
        </div>

        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.postsGrid}>
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className={styles.postCard}
              onClick={() => handlePostClick(post)}
            >
              <div className={styles.postImage}>
                <img src={post.image} alt={post.title} />
                <span className={styles.postCategory}>{post.category}</span>
              </div>
              
              <div className={styles.postContent}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                
                <div className={styles.postMeta}>
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
