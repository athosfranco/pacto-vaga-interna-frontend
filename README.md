![image](https://github.com/athosfranco/pacto-vaga-interna-frontend/assets/73993813/85d71dfc-d43b-4e6a-8d39-a13eb87cac52)
# Desafio Técnico - App de Recrutamento Interno (FRONTEND)

Esse é o repositório do Frontend do Desafio Técnico para a vaga de Desenvolvedor Full Stack (Java e Angular) - Nível Pleno. Este projeto visa criar uma aplicação web que facilita o processo de recrutamento interno para os colaboradores da empresa. O projeto foi desenvolvido com Angular no frontend, Spring Boot no backend e banco de dados relacional PostgreSQL.

## Objetivo

Desenvolver uma aplicação que permita aos usuários pesquisar e candidatar-se a vagas internas

## Funcionalidades

1. **Autenticação e Autorização:**
   - Sistema de autenticação com tokens JWT seguro para os usuários

2. **Cadastro de Vagas:**
   - Administradores cadastram novas vagas, incluindo informações como título, descrição e requisitos.
   - Administradores podem efetuar a atualização e exclusão de vagas.

3. **Candidatura a Vagas:**
   - Os colaboradores podem efetuar sua candidatura às vagas e expressar interesse em uma posição específica.
   - Notificações aos responsáveis pela vaga e ao candidato.

4. **Painel do Candidato (Bônus):**
   - Criar um painel para os candidatos acompanharem o status de suas candidaturas e receberem feedbacks.

5. **Avaliação de Candidatos (Bônus):**
   - Sistema de avaliação de candidatos pelos responsáveis pela vaga, incluindo filtros de requisitos ou tempo de empresa.

6. **Responsividade**
   - A aplicação é funcional em diferentes dispositivos, como celulares e tablets.
     ![image](https://github.com/athosfranco/pacto-vaga-interna-frontend/assets/73993813/9c74584b-db37-4b60-84b5-9e914c9ec652)

## 🚀 Como Rodar a Aplicação

É possível testar a aplicação em produção diretamente no link https://main--desafio-tecnico-pacto-frontend.netlify.app/login

O frontend está hospedado no Netlify. O backend e uma instância do banco de dados PostgreSQL estão hospedados no Railway. 

Para se candidatar para as vagas, crie uma conta nova no menu "Registrar" ou utilize as credenciais de teste a seguir: <br>
### Login: athosfranco <br>
### Senha: athos123

Para CRIAR, editar ou deletar vagas e avaliar candidaturas, use a conta admin:

### Login: admin 
### Senha: 123

A API também está documentada no Swagger: https://pacto-vaga-interna-backend-production.up.railway.app/swagger-ui/index.html#/

## Rodando a Aplicação na Máquina Local

1. **Backend (Spring Boot):**
   - Acesse o repositório do backend (https://github.com/athosfranco/pacto-vaga-interna-backend/tree/main)
   - Faça um clone do projeto
   - Configure as variáveis de ambiente no arquivo de configuração application.properties
   - Execute a aplicação Spring Boot na porta 8080  
   - IMPORTANTE: É necessário configurar uma instância de acesso ao banco de dados PostgreSQL localmente para garantir a persistência dos dados

3. **Frontend (Angular):**
   - Acesse o repositório do frontend (https://github.com/athosfranco/pacto-vaga-interna-frontend/tree/main)
   - Faça um clone do projeto
   - Instale as dependências: `npm install`
   - Inicie o servidor de desenvolvimento: `ng serve`

 Após seguir os passos acima, acesse http://localhost:4200/ no navegador. A aplicação estará disponível localmente para testes.

Não hesite em entrar em contato se precisar de suporte ou tiver alguma dúvida.

