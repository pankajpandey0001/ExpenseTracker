![Apache Maven](https://img.shields.io/badge/Apache%20Maven-Build-C71A36.svg) 
![Spring Boot Maven Plugin](https://img.shields.io/badge/Spring%20Boot-Maven%20Plugin-brightgreen.svg) 
![OCI Image](https://img.shields.io/badge/OCI-Image%20Build-blue.svg) 
![Testcontainers](https://img.shields.io/badge/Testcontainers-Integration%20Testing-2496ED.svg) 
![PostgreSQL Testcontainers](https://img.shields.io/badge/Testcontainers-PostgreSQL-4169E1.svg) 
![Spring Web](https://img.shields.io/badge/Spring%20Web-REST%20API-brightgreen.svg) 
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data-JPA-brightgreen.svg) 
![Spring Data Redis](https://img.shields.io/badge/Spring%20Data-Redis-red.svg) 
![Validation](https://img.shields.io/badge/Spring-Validation-brightgreen.svg) 
![Flyway](https://img.shields.io/badge/Flyway-Database%20Migration-CC0200.svg)

z
# Intelligent Expense & Budget Optimizer API

A robust full-stack application that combines **FastAPI**, **PostgreSQL**, and **React** to provide secure expense tracking and automated budget optimization using the **0/1 Knapsack Algorithm**.

## 🚀 Key Features

-   **JWT Authentication:** Secure user registration and login with encrypted password hashing (Bcrypt).
-   **Smart Budgeting:** An intelligent endpoint that uses Dynamic Programming (0/1 Knapsack) to recommend the best combination of expenses to maximize "priority value" within a user-defined budget.
-   **RESTful Architecture:** Complete CRUD operations for managing expenses.
-   **Relational Mapping:** Designed with SQLAlchemy ORM and PostgreSQL for reliable data persistence.
-   **Modern UI:** A responsive React-based dashboard styled with Tailwind CSS.
-   **Automated Testing:** Comprehensive API testing suite built with Pytest.

## 🛠️ Technical Stack

-   **Backend:** FastAPI (Python), SQLAlchemy, Pydantic, Jose (JWT), Passlib
-   **Database:** PostgreSQL
-   **Frontend:** React.js, Tailwind CSS
-   **Testing:** Pytest, HTTPX
-   **Environment:** Python-dotenv

## 📂 Project Structure

```text
ExpenseProject/
├── app/
│   ├── __init__.py     # It is a nametag for a folder that tells that it is a python package and helps in testing the project.
│   ├── auth.py         # JWT & Security logic
│   ├── database.py     # SQLAlchemy engine & session
│   ├── main.py         # FastAPI routes & Knapsack logic
│   ├── models.py       # Database table schemas
│   └── schemas.py      # Pydantic data validation
├── frontend/
│   ├── app.js          # JavaScript logic
│   ├── style.css       # Style or css
│   └── index.html      # HTML code
├── tests/
│   └── test_main.py    # It is a nametag for a folder that tells that it is a python package and helps in testing the project.
│   └── __init__.py     # Pytest suite
├── .env                # Environment variables (Secrets)
├── .gitignore          # Git exclusion rules
└── requirements.txt    # Python dependencies
```


## Step and Step way to run ExpenseTracker on windows

Phase1: Download Dependies-
1.  Python- Go to python.org/downloads and download latest version.
    When running the installer, check the box "Add Python.exe to PATH".

2.  Nodejs- Go to nodes.org and download "LTS"(long term support) version.
    Install it in default setting, [Used for frontend server].

3.  Git- Go to git-scm.com/downloads and download for windows.
    Install it in default setting, [Used for GitHub].

4.  Postgresql- Go to postgresql.org/download/windows/ and download installer.
    During installation, it will ask you to create password for the postgres superuser, and leave port at 5432.

5.  VS Code- Go to code.visualstudio.com/download then download for windows.
    Open the downloaded file then accept terms and click on "Add to PATH" and "Add 'Open with Code' action".


Phase2: Set Up the Database-
1.  Open the pgadmin 4 app, [it automatically installed after your postgresql installes successfully].

2.  Enter password you created to unlock it.

3.  On the left menu, expand Servers and click PostgreSQL.

4.  Right-Click on Databases then Create then Database.

5.  Name it "expense_db" and click save.


Phase3: Project Preperation-
1.  Open cmd.

2.  Install Backend Requirements.
    >> pip install -r requirements.txt

3.  Setup your Secret ".env" file.
      i.  Open your project in VS code.
     ii.  Write this in .env file
            DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/expense_db
            SECRET_KEY="Write_any_password_here"
            ALGORITHM=HS256
            ACCESS_TOKEN_EXPIRE_MINUTES=60


Phase4: Running the program locally-
1.  Open cmd

2.  Navigate to the ExpenseTracker Folder.
        cd path\to\your\ExpenseTracker

3.  Now paste this code in cmd.
        python -m venv venv
        venv\Scripts\activate

4.  Run the backend.
        paste this code: fastapi dev app/main.py
        when you see "Application startup complete" then the backend is ready.

5.  Run the frontend.
        Open another cmd window and don't close the backend cmd.
        Navigate to the frontend folder.
            cd path\to\your\ExpenseTracker\frontend
        Paste this code: npx serve -l 3000
        and after it then you see 2 url then copy it an paste in you browser.


