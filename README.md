# Linear Clone



## Installation

```bash

# Install dependencies
npm install

# Run docker
docker compose up -d

# Access mysql
docker exec -it mysql mysql -u root -p

# Run mysql to create user and grant all privileges
CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

# Run prisma migrate
npm run db:migrate:dev

# Run prisma seed
npm run db:seed

# Run the app
npm run dev

```