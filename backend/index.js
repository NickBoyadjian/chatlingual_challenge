const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
const jsonParser = bodyParser.json()
const port = 8000;
const defaultStartingDirectory = __dirname + '/test';

/* 
  Reads through the content of the provided directory,
  then maps over the list of content. If we encounter a file,
  we simply return it. Otherwise we recurse down into the next directory. 
*/
const getDirectories = (startingPath) => {
  return {
    path: startingPath,
    type: 'directory',
    content: fs.readdirSync(startingPath)
      .map(file => {
        const fullPath = path.join(startingPath, file);
        return fs.statSync(fullPath).isDirectory() ? getDirectories(fullPath) : { type: 'file', path: fullPath };
      })
  }
}

app.get('/', (_, res) => {
  const directory = process.argv[2] || defaultStartingDirectory;
  res.send(getDirectories(directory));
});

app.post('/create', jsonParser, (req, res) => {
  fs.writeFileSync(req.body.path.toString(), '');
  res.send('Done')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});