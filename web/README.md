# Let me Ask

Uma aplicação web moderna para criar salas de perguntas e receber respostas geradas por Inteligência Artificial. O projeto permite aos usuários criar salas, fazer perguntas e obter respostas em tempo real, além de gravar áudio das sessões.

## 🚀 Sobre o Projeto

O **Let me Ask** é uma plataforma interativa que facilita a criação de ambientes colaborativos para perguntas e respostas. A aplicação utiliza tecnologias modernas do ecossistema React e oferece uma experiência de usuário fluida e responsiva.

### Principais Funcionalidades

- ✅ **Criação de Salas**: Crie salas personalizadas com nome e descrição
- ✅ **Sistema de Perguntas**: Faça perguntas e receba respostas da IA
- ✅ **Respostas em Tempo Real**: Visualize respostas sendo geradas em tempo real
- ✅ **Gravação de Áudio**: Grave áudio das sessões para análise posterior
- ✅ **Interface Moderna**: Design responsivo com tema escuro
- ✅ **Lista de Salas Recentes**: Acesso rápido às salas criadas

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento da aplicação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **TanStack Query** - Gerenciamento de estado e cache
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Day.js** - Manipulação de datas

### Ferramentas de Desenvolvimento

- **Biome** - Linter e formatter
- **Ultracite** - Regras de acessibilidade e qualidade de código

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend da aplicação rodando na porta 3333

## 🔧 Como Executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd web
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 4. Para build de produção

```bash
npm run build
```

### 5. Para visualizar o build

```bash
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/            # Componentes de UI base
│   ├── create-room-form.tsx
│   ├── question-form.tsx
│   ├── question-item.tsx
│   └── room-list.tsx
├── pages/              # Páginas da aplicação
│   ├── create-room.tsx
│   ├── room.tsx
│   └── record-room-audio.tsx
├── http/               # Hooks e tipos para API
│   ├── types/         # Tipos TypeScript
│   ├── use-create-room.ts
│   ├── use-create-question.ts
│   └── use-rooms.ts
├── lib/                # Utilitários e configurações
├── app.tsx            # Componente principal
└── main.tsx           # Ponto de entrada
```

## 🔄 Fluxo da Aplicação

1. **Página Inicial** (`/`):

   - Formulário para criar novas salas
   - Lista de salas recentes

2. **Sala de Perguntas** (`/room/:roomId`):

   - Interface para fazer perguntas
   - Lista de perguntas e respostas
   - Botão para gravar áudio

3. **Gravação de Áudio** (`/room/:roomId/audio`):
   - Interface para gravar áudio da sessão
   - Upload automático para o backend

## 🎨 Interface e UX

- **Tema Escuro**: Interface com tema escuro por padrão
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Feedback Visual**: Indicadores de carregamento e estados
- **Acessibilidade**: Componentes seguindo padrões de acessibilidade
- **Animações**: Transições suaves entre estados

## 🔌 Integração com Backend

A aplicação se comunica com um backend na porta `3333` através das seguintes rotas:

- `GET /rooms` - Listar salas
- `POST /rooms` - Criar sala
- `GET /rooms/:roomId/questions` - Listar perguntas de uma sala
- `POST /rooms/:roomId/questions` - Criar pergunta
- `POST /rooms/:roomId/audio` - Upload de áudio

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
