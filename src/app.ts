import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';    
import AppDataSource from './util/db';

import authroutes from './routes/auth';
import adminroutes from './routes/admin';

const app = express(); 

app.use(bodyParser.json());

dotenv.config();

app.use('/', authroutes);
app.use('/admin', adminroutes);

AppDataSource.initialize()
.then(() => {
    // here you can start to work with your database
    console.log('Database connected');
    app.listen(process.env.PORT || 3000);
})
.catch((error) => {
  console.log(error)
  console.log(process.env.DB_PASSWORD);
})


// docker run --name clothesshop -e MYSQL_ROOT_PASSWORD=admin123 -d mysql:latest
