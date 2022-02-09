import express from 'express';
import http from 'http';
import morgan from 'morgan';
import filesRouter from './routes/filesRouter.js';


const hostname = '0.0.0.0';
const port = 3000;

const app = express();
app.use(morgan('dev'));

app.get('/',(req, res) => {
  res.statusCode = 200;
  res.send('Server is running...');
});

app.use('/files', filesRouter);


const server = http.createServer(app);

server.listen(port, hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});