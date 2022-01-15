import express from 'express';
import routers from './routers.js';

const app = express();
const port = 3000;


app.use('/notes', routers);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
