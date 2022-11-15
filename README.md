
# Workout Tracker

Fullstack MERN app for tracking users improvements, weight loss, etc...



## Frontend libaries:
Vite, ReduxJs, Axios, Buffer, ChartJs, Filepond, FramerMotion, React-beautiful-dnd, react-image-file-resizer, react-tostify
## Backend libaries:
bcryptjs, cors, dotenv, express-async-handler, express, jsonwebtoken, mongoose, morgan, nodemailer, nodemon 
## API Reference

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
  PUT /user/update (Protected with middleware)
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


