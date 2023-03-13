## Instalación del proyecto

### 1) Correr Docker Compose para levantar una instancia local de PostgresSql.

``` bash
    docker compose up
```

### 2) Opcional: Instalar yarn de ser necesario

``` bash
    npm install -g yarn
```

### 3) Instalación de dependencias

``` bash
    yarn
```

### 4) Correr el build del proyecto

``` bash
    yarn build
```

### 5) Generar la migración para crear la tabla *customer_entity*

``` bash
    yarn migration:generate
```

### 6) Crear la tabla *customer_entity*

``` bash
    yarn migration:run
```

### 7) Crear la tabla *customer_entity*

``` bash
    yarn init:database
```

### 8) Levantar serverless

``` bash
    serverless offline
```

## Test en memoria

``` bash
    yarn test:acceptance
```

### Tests con base de datos

``` bash
    yarn test:e2e
```

## Endpoints

### Base URL

http://localhost:3000/dev

GET /customers - list all customers sort by availableCredit

PUT /customers/add-credit/<uuid> - add credit to customer account

``` json
    body {
        availableCredit
    }
```

## Datos de prueba

``` json
    {
        uuid: '47aea7e1-d9da-45ae-b94e-f3a8f966daa4',
        name: 'María',
        lastName: 'Gonzalez',
        accountNumber: 123456,
        availableCredit: 0,
    }
```

El resto de los customers que se listan se generan aleatoriamente con faker.
