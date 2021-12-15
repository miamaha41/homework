const express = require('express');
const morgan = require('morgan');
const userRouter = require('./user')
const app = express();
const port = 3000;
app.use(morgan("dev"));
app.get('/', (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

const middleware = (req, res, next) => {
    req.real_name = "vinh";
    console.log('req')
    next();
}
app.use('/user', middleware, middleware, middleware, userRouter)