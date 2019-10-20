# DESIGN DOC

The front end and the backend will be decoupled.

> Front End - Netlify (Blockstack)

> Back End - Heorku (API)

> Database - MongoDB Atlas

## Application Endpoints

### Create a Question

**POST:** ```/question```

```js
// Request Body
{
    question: String // user id
}
````

### Request a Question

**GET:** ```/question```

```js
// Response Body
{
    question: String // user id
}
```

### Submit an Answer

**POST:** ```/answer```

```js
// Request Body
{
    __id: String // question id
}

// removes the question from the collection
```

## Creating a Question

1. API request with the users block id
2. Store the question in the users blockstack account

## Getting a Question

1. Request a question from the API
2. Use the question's user block id to request the question data from blockstack
3. Get the question from blockstack

## Submitting an Answer

1. Add the answer to the users stackblock account
2. API request to remove the question from the collection in MongoDB

## Retrieving an Answer

1. When user logins in or requests data, check for answers in stackblock account

## Validating an answer

1. *Accepting* the correct answer removes the answer from the users stackblock account
2. *Declining* the answer prompts if the user would like to resubmit, and then removes the answer from the users stackblock account
3. If the user resubmits, the question is added back to the collection