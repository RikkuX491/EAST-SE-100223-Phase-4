# Lecture # 8 - Authorization

## Lecture Topics

- Authorizing Requests
- Password Protection with Bcrypt

## Setup

1. Clone this repository.

2. Enter the command `git checkout 08_starter` in your terminal to switch to the `08_starter` branch that contains the content for this lecture.

3. Make sure that you are in the correct directory (folder) that contains a `Pipfile`, then enter the command `pipenv install` in your terminal to install the required libraries.

4. Now that your `pipenv` virtual environment is ready to use, enter the command `pipenv shell` in your terminal to enter the virtual environment.

5. Enter the command `cd server` in your terminal to move into the server directory.

6. Run these two terminal commands while in the `server/` directory:

```
export FLASK_APP=app.py

export FLASK_RUN_PORT=7777
```

7. You can either enter `python app.py` or `flask run` in the terminal to run your Flask app.

8. Open a new terminal and enter the command `npm install --prefix client` to install the dependencies for your React app.

9. Enter the command `npm start --prefix client` to start the React app.