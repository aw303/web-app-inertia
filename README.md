# Finance Dashboard

A modern **Finance Dashboard** built using **Laravel, Inertia.js, and
React**.\
This project demonstrates how to build a **SPA-like financial management
system** using a modern Laravel stack without building a separate API.

The dashboard allows users to manage income, expenses, budgets, and
financial analytics through a clean interface.

------------------------------------------------------------------------

# Tech Stack

## Backend

-   Laravel
-   MySQL

## Frontend

-   React
-   Inertia.js
-   Vite
-   TailwindCSS

## Infrastructure

-   Docker
-   Apache
-   Node.js

------------------------------------------------------------------------

# Features

## Authentication

-   User registration
-   Login / Logout
-   Profile management

## Dashboard

-   Total balance
-   Monthly income
-   Monthly expenses
-   Financial summary cards

## Transactions

-   Add income
-   Add expense
-   Edit transactions
-   Delete transactions
-   Transaction history

## Categories

-   Create categories
-   Expense categorization
-   Income categorization

## Budgets

-   Set monthly budget
-   Budget tracking
-   Budget alerts

## Analytics

-   Monthly financial reports
-   Category spending chart
-   Income vs Expense chart

## Filters

-   Filter transactions by date
-   Filter by category
-   Search transactions

------------------------------------------------------------------------

# Project Structure

app ├── Models ├── Http │ ├── Controllers │ └── Requests

resources └── js ├── Pages │ ├── Dashboard │ ├── Transactions │ ├──
Budgets │ └── Reports │ ├── Components │ └── Layouts

routes └── web.php

------------------------------------------------------------------------

# Installation (Docker)

Clone repository

git clone https://github.com/vicky99303/web-app-inertia cd
finance-dashboard

Start Docker

docker compose up -d --build

Enter container

docker exec -it inertia_app bash

Install dependencies

composer install npm install

Run migrations

php artisan migrate

Run frontend

npm run dev

Open in browser

http://localhost:8080

------------------------------------------------------------------------

# Database Schema (Simplified)

## Users

id\
name\
email\
password

## Transactions

id\
user_id\
category_id\
amount\
type (income / expense)\
description\
date

## Categories

id\
user_id\
name\
type

## Budgets

id\
user_id\
category_id\
limit\
month\
year

------------------------------------------------------------------------

# Future Improvements

-   Multi currency support
-   Export financial reports
-   Email financial summary
-   Mobile responsive UI
-   PWA support
-   AI spending insights

------------------------------------------------------------------------

# Purpose

This project was created as a **portfolio project** to demonstrate:

-   Laravel + Inertia architecture
-   SPA without API
-   React integration with Laravel
-   Docker based development environment
-   Financial data visualization

------------------------------------------------------------------------

# License

MIT