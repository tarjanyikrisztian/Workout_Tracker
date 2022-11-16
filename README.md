
# Workout Tracker

Fullstack app with MERN stack (MongoDB, Express, React, Node) for tracking users improvements, workouts, weight loss, etc.. in the gym.

## Frontend libaries

Vite, ReduxJs, Axios, Buffer, ChartJs, Filepond, FramerMotion, React-beautiful-dnd, react-image-file-resizer, react-tostify

## Backend libaries

bcryptjs, cors, dotenv, express-async-handler, express, jsonwebtoken, mongoose, morgan, nodemailer, nodemon 

## API Reference

### Protect Middleware

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string`| Bearer header token |

verifies if the token is valid and is for the user

### User model

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstname` | `string` | **Required**. user's firstname |
| `lastname` | `string` | **Required**. user's lastname |
| `bio` | `string` | user's profile bio |
| `email` | `string` | **Required**. user's email |
| `password` | `string` | **Required, min length: 8**. user's password |
| `verified` | `boolean` | **Required, default: false**. is user's email is verified |
| `image` | `buffer` | **default: null**. user's profile picture |
| `weight` | `integer array` | **Required**. user's saved weights |
| `weightDate` | `date array` | **Required**. user's saved weights date |
| `height` | `integer` | **Required**. user's height |
| `age` | `integer` | **Required**. user's age |


#### Register user

```http
  POST /user/register
```

| Parameter | Type     |
| :-------- | :------- |
| `firstname` | `string`|
| `lastname` | `string`|
| `email` | `string` | 
| `password` | `string` | 
| `weight` | `integer` |
| `height` | `integer` | 
| `age` | `integer` | 

Registers a user and sends a verification email.

#### Login user

```http
  POST /user/login
```

| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` | 
| `password` | `string` |  

logins the user if the user is verified.

#### Update user

```http
  PUT /user/update (protect middleware)
```

| Parameter | Type     |
| :-------- | :------- |
| `firstname` | `string`|
| `lastname` | `string`|
| `bio` | `string` | 
| `image` | `buffer` | 
| `weight` | `integer` |
| `weightDate` | `date` |
| `height` | `integer` | 
| `age` | `integer` | 

Updates user's information and if weight changes push it to the array and save the current date.

#### Verify user

```http
  GET /user/:id/verify/:token
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:id` | `string`| user's id |
| `:token` | `string`| generated token for authentication|

If the generated token is for the user, verifies the user and redirects to the main page

### Exercise model

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `exercisename` | `string` | **Required**. exercise's name |
| `bodypart` | `string array` | **Required**. which bodyparts worked by the exercise |
| `description` | `string` | exercise's description |
| `ispublic` | `boolean` | is this exercise public |
| `user` | `objectID` | **Required**. which user created the exercise |
| `likedBy` | `objectID array` | **default: []**. which users liked the exercise |
| `image` | `buffer` | **default: null**. exercise's picture |

#### Get exercises

```http
  GET /exercise
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string`| token if the user logged in and to get the user|

If the user not logged in only returns the public exercises.

If the user is logged in returns public exercises and the user's private exercises. 

#### Create exercise

```http
  POST /exercise (protect middleware)
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `exercisename` | `string` | **Required**. |
| `bodypart` | `string array` | **Required**. Minimum: 1, Maximum: 3 |
| `description` | `string` |  |
| `ispublic` | `boolean` | |
| `user` | `objectID` | **Required**. gets the user id from the middleware |
| `image` | `buffer` |  |

Creates an exercise.

#### Update exercise

```http
  PUT /exercise/:id (protect middleware)
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:id` | `string` | **Required**. exercise's id |
| `exercisename` | `string` | rename exercise |
| `bodypart` | `string array` | edit bodyparts |
| `description` | `string` | edit description |
| `ispublic` | `boolean` | edit publicity |
| `image` | `buffer` | edit picture |

Edit exercise.

#### Update exercise

```http
  DELETE /exercise/:id (protect middleware)
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:id` | `string` | **Required**. exercise's id |

Delete exercise.

#### Like exercise

```http
  PUT /exercise/:Uid/like/:Eid
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:Uid` | `string` | **Required**. user's id |
| `:Eid` | `string` | **Required**. exercise's id |

Puts the user's id into the exercise's likedBy array.

#### Dislike exercise

```http
  PUT /exercise/:Uid/dislike/:Eid
```

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `:Uid` | `string` | **Required**. user's id |
| `:Eid` | `string` | **Required**. exercise's id |

Removes the user's id from the exercise's likedBy array.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` mongodb connection

`SECRET` jwt secret

`EMAIL` to send emails, email address

`EMAIL_PASSWORD` to send emails, email password

## Authors

- [Tarjányi Krisztián (P1Z6ZC)](https://github.com/tarjanyikrisztian)