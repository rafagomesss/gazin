# Gazin Project 🚀

## Descrição
Este repositório contém o código fonte do desafio Gazin, uma aplicação web desenvolvida com Laravel (backend API) e Vue.js (frontend).

## Requisitos

- PHP >= 8.2
- Composer
- Node.js >= 20
- NPM
- MySQL 8.0.33

## Instalação e Configuração

### Clonar o Projeto

```bash
git clone https://github.com/rafagomesss/gazin.git
cd gazin
```
## Configurar o Backend (Laravel)
### 1. Instalação de Dependências e Configuração Inicial

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

## 2. Configurar o Banco de Dados
### Crie um banco de dados MySQL chamado gazin com charset utf8mb4.
#### .env

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=gazin
DB_USERNAME=root
DB_PASSWORD=root

## 3. Iniciar o Servidor PHP Built-in

```bash
php artisan serve
```

O backend estará acessível em http://localhost:8000.

## Configurar o Frontend (Vue.js)

```bash
cd ../frontend
npm install
npm run dev
```
O frontend estará acessível em http://localhost:5173.
