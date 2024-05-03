# RESTful API with JavaScript and MongoDB

This project is a simple RESTful API built with Node.js and MongoDB as the database. It provides endpoints that store the following types of data collected from students

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create and export student data.
- MongoDB for efficient data storage.


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB server running locally or providing a connection URI.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Davidosky007/directED-api.git
   ```
   
2. Install dependencies:

   ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=5000

MONGO_URI= a hosted MongoDB URL

JWT_SECRET=secret
```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Navigate to `http://localhost:5000/` to access the API.


## Endpoints

## sample request 
`curl --location 'https://directed-api.onrender.com/webhook/tally' \
--header 'Content-Type: application/json' \
--data '{
  "pseudonym": "happygreensnake1",
  "data": {
    "qualtricsSurveys": [
      {
        "percData": { "question1": "answer1", "question2": "answer2" },
        "spiSpiritData": { "question1": "answer1", "question2": "answer2" }
      }
    ],
    "tallyForms": ["Expression of Interest"],
    "yenzaTest": { "score": 85 },
    "attendanceRecords": { "date": "2022-05-01", "status": "present" },
    "oralExamResults": { "score": 90 },
    "projectGrades": { "score": 95 },
    "quizResults": { "score": 80 }
  }
}
'`
## sample response 
`{
    "_id": "6634da2d007585025bacdbb8",
    "pseudonym": "happygreensnake1",
    "__v": 0,
    "attendanceRecords": {
        "date": "2022-05-01",
        "status": "present"
    },
    "oralExamResults": {
        "score": 90
    },
    "projectGrades": {
        "score": 95
    },
    "qualtricsSurveys": [
        {
            "percData": {
                "question1": "answer1",
                "question2": "answer2"
            },
            "spiSpiritData": {
                "question1": "answer1",
                "question2": "answer2"
            },
            "_id": "6634dc560bce1938dfc8ad59"
        }
    ],
    "quizResults": {
        "score": 80
    },
    "tallyForms": [
        "Expression of Interest"
    ],
    "yenzaTest": {
        "score": 85
    }
}`

[API link](https://directed-api.onrender.com)


## Authentication



## Environment
Create a .env file in the root directory and add the following environment variables:
```bash
NODE_ENV=DEV
MONGO_URI_DEV=<A hosted MongoDB database>
JWT_SECRET=<secret>
```

## Testing

To run the tests, run the following command:
```bash
npm run test
```

## Docker
To run the app in a docker container, run the following command:
```bash
docker build -t project_name.
docker run -d -p 8080:8080 project_name
```
