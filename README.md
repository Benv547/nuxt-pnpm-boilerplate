# Project Setup

## Install dependencies
```bash
pnpm update --workspace -r
pnpm install
```

## Postgres database
```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
### Run migrations
```bash
node ace migration:run
```

### Create a .env file
```bash
cp .env.example .env
```

### Update the database connection settings in .env
For example:
```env
DB_CONNECTION=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
```

## Keycloak
```bash
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.4 start-dev
```
https://medium.com/@victoronu/implementing-user-invite-and-registration-workflow-in-keycloak-a-step-by-step-guide-3f1821b5702

### Create a new realm

1. Go to the Keycloak admin console
2. Click on the `Add realm` button
3. Enter the name of the realm and click on the `Create` button
   (suggested name: `expirapp`)

### Create a new client

(Don't forget to switch to the realm you just created)

1. Go to the `Clients` tab
2. Click on the `Create` button
3. Enter the client ID of the client and click on the `Next` button
   (suggested name: `expirapp-client`)
4. Check the `Direct access grants` `OAuth 2.0 Device Authorization Grant` and click on the `Next` button
5. Add the following `Valid Redirect URIs`:
    - `http://localhost:3000/*`
    - `http://localhost:3001/*`
6. Add the following `Web Origins`:
    - `http://localhost:3000`
    - `http://localhost:3001`
7. Click on the `Save` button

# Development

## Create a new model
### Create a new model and database table
```bash
node ace make:model -m examples
```

### Create a new controller
```bash
node ace make:controller ExampleController
```