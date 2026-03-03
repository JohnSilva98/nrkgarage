# NRK Garage

Sistema de gestão completa para oficinas mecânicas, desenvolvido com Next.js, PostgreSQL e Prisma.

## 🚀 Visão Geral

O NRK Garage é uma aplicação web moderna para gerenciamento de oficinas mecânicas, permitindo o controle completo de ordens de serviço, acompanhamento de tarefas, e gestão de mecânicos e clientes.

## ✨ Funcionalidades

- **Gestão de Ordens de Serviço**: Crie e acompanhe cards de serviço com informações detalhadas
- **Controle de Mecânicos**: Cadastre e gerencie mecânicos responsáveis pelos serviços
- **Sistema de Tarefas**: Divida serviços em tarefas menores com acompanhamento de conclusão
- **Gestão de Serviços**: Adicione múltiplos serviços a cada ordem
- **Autenticação Segura**: Sistema de login com NextAuth.js
- **Interface Responsiva**: Design moderno com Tailwind CSS
- **Status em Tempo Real**: Acompanhe o progresso dos serviços (Criado, Aguardando Início, Trabalhando, Aguardando Entrega)

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 16.1.6, React 19.2.3
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 7.4.2
- **Autenticação**: NextAuth.js 4.24.13
- **Estilização**: Tailwind CSS 4
- **Ícones**: Lucide React
- **Deploy**: Vercel

## 📋 Estrutura do Projeto

```
nrkgarage/
├── src/
│   ├── app/
│   │   ├── api/          # Rotas da API
│   │   ├── components/   # Componentes React
│   │   └── contexts/     # Contextos React
│   ├── lib/              # Utilitários e configurações
│   └── proxy.js          # Middleware de autenticação
├── prisma/
│   ├── migrations/       # Migrações do banco
│   ├── schema.prisma     # Schema do Prisma
│   └── seed.js          # Dados iniciais
└── public/              # Arquivos estáticos
```

## 🗄️ Modelo de Dados

### Mecânico
- Informações dos mecânicos da oficina
- Status de ativação
- Relacionamento com cards de serviço

### Card (Ordem de Serviço)
- Informações do veículo e cliente
- Status do serviço
- Observações e descrições
- Relacionamento com mecânicos, serviços e tarefas

### Serviço
- Descrição dos serviços realizados
- Vinculado a cards específicos

### Tarefa
- Divisão de serviços em tarefas menores
- Controle de conclusão
- Vinculada a cards específicos

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <repository-url>
cd nrkgarage
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/nrkgarage"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configure o banco de dados
```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev

# (Opcional) Popule o banco com dados iniciais
npm run prisma:seed
```

### 5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## 🔐 Autenticação

O sistema utiliza NextAuth.js para autenticação. Para desenvolvimento, use as seguintes credenciais:

- **Email**: `admin@nrkgarage.com`
- **Senha**: `123456`

> **Nota**: Em produção, implemente a validação no banco de dados na função `authorize` do provider de credenciais.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint
- `npm run prisma:seed` - Popula o banco com dados iniciais

## 🌐 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. Faça o deploy automático

### Outras plataformas
```bash
npm run build
npm run start
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para suporte, envie um e-mail para [seu-email@exemplo.com] ou abra uma issue no GitHub.

## 🔄 Roadmap

- [ ] Sistema de notificações
- [ ] Relatórios e analytics
- [ ] Integração com sistemas de pagamento
- [ ] Aplicativo mobile
- [ ] Sistema de agendamento online

---

**Desenvolvido com ❤️ para a comunidade de oficinas mecânicas**
