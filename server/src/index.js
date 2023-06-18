import express from 'express'
import bodyParser from 'body-parser';
import connect from './config/database-config.js';
import router from './routes/index.js';
import { passportAuth } from './config/jwt-middleware.js';
import passport from 'passport';

const app = express();
const PORT = 5000 || process.env.PORT;


app.use(passport.initialize());
passportAuth(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', router);
app.listen(PORT, async () => {


    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");

})   