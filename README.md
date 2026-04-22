# TurboX - Simulador de Preparações Automotivas

O simulador de preparações automotivas mais avançado do Brasil. Transforme qualquer carro em uma máquina de alta performance com simulações realísticas e upgrades detalhados.

## 🚀 Tecnologias

- **Next.js 15.5.2** com Turbopack
- **React 19** com Hooks
- **CSS Modules** para estilização
- **Axios** para requisições HTTP
- **React Toastify** para notificações

## 🏁 Getting Started

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Executar em produção
npm run build
npm start
```

## 📱 Funcionalidades

### 🏠 **Home**
- Hero section com call-to-actions
- Seção de marcas com 16 fabricantes
- Seção de usuários e comunidade
- Informações sobre o projeto

### 🚗 **Carros**
- Lista de carros por marca
- Filtros avançados
- Detalhes completos de cada veículo
- Sistema de busca

### 👥 **Usuários & Carros**
- Dashboard de usuários cadastrados
- Gerenciamento de carros por usuário
- Estatísticas em tempo real
- Filtros e busca avançada

### ⚙️ **Simulação**
- Sistema completo de upgrades
- Cálculos de performance em tempo real
- Mais de 200 peças disponíveis
- Resultados precisos de potência e torque

## 🛠 API Endpoints

### **Autenticação**
```
POST /api/auth/login
POST /api/auth/register  
POST /api/auth/logout
```

### **Carros**
```
GET    /api/cars                    # Listar carros com filtros
GET    /api/cars/brands             # Listar marcas disponíveis
GET    /api/cars/categories         # Listar categorias
GET    /api/cars/brand/:brand       # Carros por marca
GET    /api/cars/:id               # Detalhes de um carro
POST   /api/cars                   # Criar novo carro
PUT    /api/cars/:id               # Atualizar carro
DELETE /api/cars/:id               # Remover carro
```

### **Usuários & Carros**
```
GET    /api/users/with-cars        # Usuários com seus carros
GET    /api/users/:id/with-cars    # Usuário específico com carros
GET    /api/users/:id/cars         # Carros de um usuário
POST   /api/users/:id/cars         # Adicionar carro ao usuário
DELETE /api/users/:id/cars/:carId  # Remover carro do usuário
GET    /api/users/stats            # Estatísticas gerais
```

### **Simulações**
```
POST /api/simulations              # Criar simulação
GET  /api/simulations/history      # Histórico de simulações
```

## 🎨 Marcas Suportadas

- Volkswagen, BMW, Ford, Hyundai
- Toyota, Nissan, Chevrolet, Mitsubishi
- Honda, Mercedes, Audi, Dodge
- Renault, Subaru, Mazda, Porsche

## 🌟 Características Técnicas

### **Performance**
- Turbopack para builds ultra-rápidos
- CSS Modules para isolamento de estilos
- Lazy loading de componentes
- Otimização automática de imagens

### **UX/UI**
- Design responsivo para mobile e desktop
- Animações suaves com CSS transitions
- Tema dark com gradients vermelhos
- Componentes reutilizáveis

### **Arquitetura**
- Componentes funcionais com Hooks
- Gerenciamento de estado local
- API service layer isolada
- Error boundaries e tratamento de erros

## 🔧 Configuração do Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   ├── home/               # Página inicial
│   ├── users/              # Gestão de usuários
│   ├── car/                # Detalhes de carros
│   ├── carList/            # Lista de carros
│   ├── services/           # Camada de API
│   └── ...
├── public/
│   ├── images/             # Imagens do projeto
│   └── logos/              # Logos das marcas
└── ...
```

## 🚀 Deploy

O projeto está otimizado para deploy no Vercel:

```bash
npm run build
```

## 📄 Licença

Desenvolvido com ❤️ para os amantes da velocidade.
© 2025 TurboX - Todos os direitos reservados.
