import express from 'express';
import UserRepository from "./src/app/Repositories/UserRepository";

// const app = express();
let user = new UserRepository();
user.createSeederUser(2);
// app.listen(8080, () => {
//     console.log('server running on port 8080');
// });