# NLW Agents - Sistema de IA para Transcrição e Perguntas

Um sistema inteligente que permite transcrever áudios de aulas/palestras e fazer perguntas sobre o conteúdo usando IA.

## 🎯 Sobre o Projeto

O **NLW Agents** é uma API que combina tecnologias modernas para criar um sistema de IA capaz de:

- **Transcrever áudios** de aulas ou palestras automaticamente
- **Gerar embeddings** dos textos transcritos para busca semântica
- **Responder perguntas** sobre o conteúdo das aulas usando IA
- **Buscar informações relevantes** no contexto das transcrições

### Funcionalidades Principais

- 🎤 **Upload de áudio** - Envie arquivos de áudio para transcrição
- 📝 **Transcrição automática** - Conversão de áudio para texto em português
- 🔍 **Busca semântica** - Encontra trechos relevantes usando embeddings
- 🤖 **IA para respostas** - Gera respostas baseadas no contexto das aulas
- 📚 **Organização por salas** - Organize conteúdo por diferentes salas/aulas

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com TypeScript nativo (experimental strip types)
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** com extensão **pgvector** para vetores
- **Drizzle ORM** - Type-safe database operations
- **Zod** - Schema validation e type safety
- **Docker** - Containerização do banco de dados

### IA e Processamento
- **Google Gemini AI** - Transcrição de áudio e geração de respostas
- **Embeddings** - Vetores para busca semântica
- **pgvector** - Armazenamento e busca de vetores no PostgreSQL

### Desenvolvimento
- **ESLint** - Linting e formatação de código
- **Drizzle Kit** - Migrations e seed do banco de dados

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular e escalável:

```
src/
├── server.ts              # Configuração principal do servidor
├── env.ts                 # Validação de variáveis de ambiente
├── http/
│   └── routes/           # Endpoints da API
├── services/
│   └── gemini.ts         # Integração com IA do Google
└── db/
    ├── connection.ts      # Conexão com banco de dados
    ├── schema/           # Definição das tabelas
    └── seed.ts           # Dados iniciais
```

### Estrutura do Banco de Dados

- **`rooms`** - Salas/aulas para organizar o conteúdo
- **`audio_chunks`** - Chunks de áudio transcritos com embeddings
- **`questions`** - Perguntas e respostas sobre o conteúdo

## ⚙️ Setup e Configuração

### Pré-requisitos

- Node.js (versão com suporte a `--experimental-strip-types`)
- Docker e Docker Compose
- Chave de API do Google Gemini

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd server
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/agents"
GEMINI_API_KEY="sua-chave-do-gemini-aqui"
```

**Importante:** Você precisa de uma chave de API do Google Gemini. Obtenha em: https://makersuite.google.com/app/apikey

### 3. Configure o banco de dados
```bash
docker-compose up -d
```

### 4. Instale as dependências
```bash
npm install
```

### 5. Execute as migrações do banco
```bash
npm run db:generate
npm run db:migrate
```

### 6. (Opcional) Popule o banco com dados de exemplo
```bash
npm run db:seed
```

### 7. Execute o projeto

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## 📚 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo de desenvolvimento com hot reload
- `npm start` - Executa o servidor em modo de produção
- `npm run db:generate` - Gera migrations baseadas no schema
- `npm run db:migrate` - Executa as migrations no banco
- `npm run db:studio` - Abre o Drizzle Studio para visualizar dados
- `npm run db:seed` - Popula o banco de dados com dados de exemplo
- `npm run lint` - Executa o linter para verificar código

## 🌐 Endpoints da API

A API estará disponível em `http://localhost:3333`

### Health Check
```http
GET /health
```
Verifica se a API está funcionando.

### Salas (Rooms)

#### Listar salas
```http
GET /rooms
```

#### Criar sala
```http
POST /rooms
Content-Type: application/json

{
  "name": "Nome da Sala",
  "description": "Descrição da sala (opcional)"
}
```

### Áudio

#### Upload de áudio
```http
POST /rooms/:roomId/audio
Content-Type: multipart/form-data

[arquivo de áudio]
```

### Perguntas

#### Listar perguntas de uma sala
```http
GET /rooms/:roomId/questions
```

#### Fazer pergunta sobre o conteúdo
```http
POST /rooms/:roomId/questions
Content-Type: application/json

{
  "question": "Sua pergunta sobre o conteúdo da aula"
}
```

## 🔄 Fluxo de Funcionamento

1. **Criar uma sala** - Organize seu conteúdo por salas/aulas
2. **Upload de áudio** - Envie arquivos de áudio da aula/palestra
3. **Transcrição automática** - O sistema converte áudio para texto
4. **Geração de embeddings** - Cria vetores para busca semântica
5. **Fazer perguntas** - Pergunte sobre o conteúdo e receba respostas baseadas no contexto

## 🧪 Testando a API

Use o arquivo `client.http` para testar os endpoints:

```bash
# Instale a extensão REST Client no VS Code
# Ou use ferramentas como Postman/Insomnia
```

## 🐳 Docker

O projeto inclui configuração Docker para o banco de dados:

```bash
# Iniciar banco
docker-compose up -d

# Parar banco
docker-compose down
```

## 📝 Exemplo de Uso

1. **Criar uma sala:**
```bash
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -d '{"name": "Aula de React", "description": "Fundamentos do React"}'
```

2. **Upload de áudio:**
```bash
curl -X POST http://localhost:3333/rooms/{roomId}/audio \
  -F "audio=@aula-react.mp3"
```

3. **Fazer pergunta:**
```bash
curl -X POST http://localhost:3333/rooms/{roomId}/questions \
  -H "Content-Type: application/json" \
  -d '{"question": "O que é JSX no React?"}'
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com ❤️ 
