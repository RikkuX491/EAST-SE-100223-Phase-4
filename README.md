# Lecture # 6 - Client & Server Communication

## Lecture Topics

- Adding React to Flask
- CORS (Cross-Origin Resource Sharing)
- How to proxy the requests to our API

## Setup

1. Clone this repository.

2. Enter the command `git checkout 06_starter` in your terminal to switch to the `06_starter` branch that contains the content for this lecture.

3. Make sure that you are in the correct directory (folder) that contains a `Pipfile`, then enter the command `pipenv install` in your terminal to install the required libraries.

4. Now that your `pipenv` virtual environment is ready to use, enter the command `pipenv shell` in your terminal to enter the virtual environment.

5. Enter the command `cd server` in your terminal to move into the server directory.

6. Run these two terminal commands while in the `server/` directory:

```
export FLASK_APP=app.py

export FLASK_RUN_PORT=7777
```