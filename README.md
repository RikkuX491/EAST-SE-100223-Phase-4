# Lecture # 1 - Intro to Flask

## Lecture Topics

- How the Web Works
- Web Servers
- Creating a Flask Application
- Flask Routing and Views
- Flask Application Structure

## Key Vocab

- Web Server: a combination of software and hardware that uses Hypertext Transfer Protocol (HTTP) and other protocols to respond to requests made over the internet.
- Routing: Routing is the association of URLs and the code that should execute when a request comes in for that URL.
- Views: We call functions that map to URLs views. Everything you view in your application is generated by a view.

## Setup

1. Clone this repository.

2. Enter the command `git checkout 01_starter` in your terminal to switch to the `01_starter` branch that contains the content for this lecture.

3. Make sure that you are in the correct directory (folder) that contains a `Pipfile`, then enter the command `pipenv install` in your terminal to install the required libraries.

4. Now that your `pipenv` virtual environment is ready to use, enter the command `pipenv shell` in your terminal to enter the virtual environment.

5. Enter the command `cd server` in your terminal to move into the server directory.

## Code-along

We will be writing our code in the `app.py` file in the `server` directory (folder):

1. Write the following code after line 1 in `app.py`:

```py
from flask import Flask
```

This will import the `Flask` class so that we can use it to create an instance of the `Flask` class to start our Flask application.

2. Write the following code on the next line:

```py
app = Flask(__name__)
```

This will create an instance of the `Flask` class so that we can use it to start our Flask application.

3. We will now build our first route and view with the following code:

```py
@app.route('/')
def index():
    return '<h1>Welcome to my website!</h1>'
```

This will show a page with a header that says "Welcome to my website!"

4. To run the application that we created in this lesson, we need to run three terminal commands inside of our `pipenv` virtual environment, from the `server/` directory. Enter the following commands in your terminal:

```
export FLASK_APP=app.py

export FLASK_RUN_PORT=7777

flask run
```

`flask run` is a command run from the terminal that looks for the name of the Python module with our Flask application instance.

5. Navigate to `http://127.0.0.1:7777` and you should see the index for our application.

6. We can also run a development server through treating our application module as a script with the `app.run()` method. Write the following code in `app.py`

```py
if __name__ == "__main__":
    app.run(port=7777, debug=True)
```

7. Enter the following command in the terminal to run the script and you should see that we're running the same server as before:

```
python app.py
```