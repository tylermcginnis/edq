import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { queueRequests } from './queue/requests';

var port = 4001;
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));

app.get('/api/initQueue', queueRequests.init);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});