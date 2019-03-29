const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//Route setup
app.get('/', (req, res) => {
  
  res.send('root route');
})
//Start server
app.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });