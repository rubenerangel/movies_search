import express from 'express';
import route from './routes/index.js'

const app = express();
const port = 3000;

app.use('/', route);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.use( (req, res, next)=>{
  res.status(404);
  if (req.accepts('json')) {
    res.send({error: true, message: 'Route Not found' });
    return;
   }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});


