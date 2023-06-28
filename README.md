# Favorite Movies

A simple web application that allows you to create a list of your favorite movies.

## Tech Stack

### Frontend

- HTML
- CSS (SASS)
- TypeScript (React.ts)

### Backend

- Nest.js
- MySQL

## Running the App Locally

To run the app on your local machine, follow these steps:

1. Clone the repository (download app) to your local machine.
2. In your local MySQL system, create new database and name it `mydb`.
3. Locate the file `app.module.ts` in the `backend/src` folder. Open it and find the line that contains the comment "Change this value with your own local MYSQL password". Modify the value 'root' in the line `password:'root'` to match your local MYSQL database password. For example, if your local MYSQL database password is 'password123', change it to `password:'password123'`.
4. Open the terminal or command line, navigate to the 'backend' folder using the `cd` (change directory) command.
5. Install '@nestjs/common' library by executing the following command: `npm install @nestjs/common`.
6. While still in 'backend' folder, execute the following command: `npm run start:dev`. This command will start the Nest.js server on port 3000. Keep this terminal/command prompt open.
7. Open another terminal or command prompt (do not close the window in which you ran the previous command), navigate to the 'frontend' folder.
8. Install some packages by executing the following command: `npm install`.
9. While still in 'frontend' folder, execute the following command: `npm run dev`. This command will start the React development server on port 4000. Keep this terminal/command prompt open.
10. Open a web browser of your choice and type in the URL: `localhost:4000`.
11. The app should now be running, and you can start adding your favorite movies to the list.

**Note:**

- Before proceeding with the instructions, please ensure that Node.js and MySQL are installed on your machine. If you haven't installed them yet, please install Node.js from nodejs.org and MySQL from mysql.com before continuing with the steps mentioned above.

## Usage

Once the app is running, you will need to create a new account. After that, you will be able to create your own list of favorite movies. You can also remove movies from the list.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to submit a pull request.
