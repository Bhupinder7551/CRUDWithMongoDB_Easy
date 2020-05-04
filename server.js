
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');



const app = express();
const PORT = process.env.PORT || 8080;


const routes = require('./routes/api');
mongoose.connect('mongodb://localhost/nodedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
})
 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.use('/api', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
