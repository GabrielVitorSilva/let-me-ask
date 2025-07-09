# 🧠 Let Me Ask - Sistema de Salas com IA para Perguntas e Respostas

**Let Me Ask** é uma aplicação web moderna e interativa que permite a criação de salas para perguntas e respostas com suporte a **Inteligência Artificial**. O sistema permite **gravação de áudio**, **transcrição automática**, **respostas em tempo real** e **busca semântica** com tecnologia de IA de ponta.

---

## ✨ Funcionalidades

### 🔹 Para os usuários:
- ✅ Criação de **salas personalizadas**
- ✅ Envio de **perguntas em tempo real**
- ✅ **Respostas automáticas** geradas por IA
- ✅ **Gravação e transcrição** de áudios
- ✅ Busca semântica com base no conteúdo da sala
- ✅ Interface responsiva e acessível

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend (`/web`)
- **React 19**, **Vite**, **TypeScript**
- **React Router DOM**, **React Hook Form**, **Zod**
- **TanStack Query**, **Tailwind CSS**, **Radix UI**
- **Lucide**, **Day.js**, **Biome**

### ⚙️ Backend (`/server`)
- **Node.js** com **Fastify** e **TypeScript**
- **PostgreSQL** + **pgvector** para vetores semânticos
- **Drizzle ORM**, **Zod**, **Docker**
- **Google Gemini AI** para transcrição e geração de respostas

---

## 🧭 Estrutura do Projeto

```
/
├── web/            # Aplicação frontend (React)
│   └── ...         
├── server/         # Backend e APIs (Fastify + IA)
│   └── ...         
└── README.md       # Este arquivo
```

---

## 📦 Requisitos

- Node.js 18+
- Docker e Docker Compose
- Chave de API do Google Gemini
- Navegador moderno

---

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

---

### 2. Backend (`/server`)

#### a) Configurar variáveis de ambiente
Crie o arquivo `.env`:

```env
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/agents"
GEMINI_API_KEY="sua-chave-do-gemini-aqui"
```

#### b) Subir o banco de dados com Docker
```bash
cd server
docker-compose up -d
```

#### c) Instalar dependências e executar o servidor
```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

---

### 3. Frontend (`/web`)

```bash
cd ../web
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Fluxo da Aplicação

1. **Criação de Salas:** organize sessões de perguntas e gravações.
2. **Upload de Áudio:** envie gravações da aula ou palestra.
3. **Transcrição e Embeddings:** IA converte áudio em texto e vetores semânticos.
4. **Perguntas:** envie perguntas e receba respostas contextualizadas em tempo real.

---

## 📚 Exemplos de Uso (API)

### Criar uma Sala
```bash
POST /rooms
{
  "name": "Aula de React",
  "description": "Introdução ao React"
}
```

### Enviar Áudio
```bash
POST /rooms/:roomId/audio
multipart/form-data com o arquivo
```

### Fazer Pergunta
```bash
POST /rooms/:roomId/questions
{
  "question": "O que é JSX no React?"
}
```

---

## 🧪 Scripts Úteis

### Frontend (`/web`)
- `npm run dev` - Inicia ambiente de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build localmente

### Backend (`/server`)
- `npm run dev` - Inicia servidor com hot reload
- `npm run db:migrate` - Executa migrações
- `npm run db:seed` - Popula o banco com dados fake
- `npm run db:studio` - Acessa painel visual com Drizzle
- `npm run lint` - Linter do código

---

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para o fork (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a **MIT** (frontend) e **ISC** (backend). Consulte os arquivos `LICENSE` em cada pasta.

---

Desenvolvido com 💡 e ☕ por entusiastas de IA e desenvolvimento web.
