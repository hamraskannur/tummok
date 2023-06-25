import express from 'express'
import cors from 'cors'
import session from 'express-session';

import connect from './config/connection.js';
import passport from './config/passport.js';
import userRoute from './router/userAuthRoute.js'
import cityRoute from "./router/cityRoute.js"

const app = express();
const port = 8000;

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    })
);


app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(express.json());
app.use(passport.initialize());

app.use('/api', userRoute);
app.use('/city', cityRoute);

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the Server');
    }
}).catch(error => {
    console.log(error,'Invalid Database connection...!');
})