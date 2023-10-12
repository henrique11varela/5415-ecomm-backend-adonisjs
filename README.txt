Project setup:

1- Install dependencies
npm i

2- Setup a mysql instance
3- Config .env file with DB and project theme
4- Migrate database with:
node ace migration:fresh

5- Seed database
node ace db:seed

6- Fetch products from FakeStoreAPI
node ace fetch:products

7- Run the server
node ace serve - preview mode
node ace serve --watch - development mode

Notes: 
node ace list:routes 
  [!] lists all routes

node ace serve --help 
  [!] shows explanations on all available comands

node ace serve make:model --help
  [!} explanations and options about the comand inserted in this case make:model, can be any other
