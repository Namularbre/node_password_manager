# Node Password Manager

A password management API to keep your password in a safe place.

## Functionalities

User system: You need to be logged in the API to use it.
You can save password and recover them. They are encrypted in the database.

## Setup

1. First, install MariaDB (at least version 10.5) and Node.js 20.10.0.

2. Run the password_manager.sql script to create the database.

3. Create a MariaDB user with all the rights on the password_manager database.

4. Next, clone the repository or download the code and extract it somewhere.

5. Create a .env file from this model:

````
DBHOST=your_db_host
DBNAME=password_manager
DBUSER=password_manager_user
DBPASS=1234

API_SECRET_KEY=aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899

ENV=prod

HOST=127.0.0.1
PORT=3000

````

Note: Don't share the content of your .env in any context, it contains the password encryption key and the information of the user of your database, with access to your saved password !

6. CHANGE THE API_SECRET_KEY with something with the same size, but random content. You can use gen_key to create such key with the command by copying the output in the console.

````
node gen_key.js
````

7. Install the dependencies with :
````
npm i
````

## Run

You can run this command to run the Node.js application :
````
node app.js
````

## Authors

- [Namularbre](https://github.com/Namularbre)
