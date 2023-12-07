# Lecture # 4 - REST APIs with Flask (Part 1)

## Lecture Topics

- Building REST APIs with `flask-restful`
- Retrieve with `flask-restful` (handling `GET` requests)
- Create with `flask-restful` (handling `POST` requests)

## Setup

1. Clone this repository.

2. Enter the command `git checkout 04_starter` in your terminal to switch to the `04_starter` branch that contains the content for this lecture.

3. Make sure that you are in the correct directory (folder) that contains a `Pipfile`, then enter the command `pipenv install` in your terminal to install the required libraries.

4. Now that your `pipenv` virtual environment is ready to use, enter the command `pipenv shell` in your terminal to enter the virtual environment.

5. Enter the command `cd server` in your terminal to move into the server directory.

6. Run these two terminal commands while in the `server/` directory:

```
export FLASK_APP=app.py

export FLASK_RUN_PORT=7777
```