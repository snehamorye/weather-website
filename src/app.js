const path = require('path');
//return an fun
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    //1st name of view to render
    //2nd value is the object that contains all of the values we want that view able to access
    res.render('index', {
        title: 'Weather App',
        name: 'Sneha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sneha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Reach out for help',
        title: 'Help',
        name: 'sneha'
    });
});

/* app.get('', (req, res) => {
    //send something back to requester
    res.send("<h1>hello sneha</h1>");
});

app.get('/help', (req, res) => {
    res.send([{
        name: 'sneha'
    }, {
        name: 'sameer'
    }]);
});

app.get('/about', (req, res) => {
    res.send("<h1>About Page !</h1>");
});
 */
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address Must Be Provided'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            } 

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query)
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sneha Morye',
        errorMessage: 'Help artical not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sneha Morye',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server up and running at port ' + port);
});