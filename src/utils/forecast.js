const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=641e90250c7036573f01f7b51f1de9ee&query='+longitude+','+latitude+'&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            let data = body.current;
            console.log(data);
            callback(undefined, data.weather_descriptions[0]+'. It is currently '+ data.temperature + ' degress out, it feels like ' + data.feelslike +' degress out. The humidity is ' +data.humidity + ' %');
        }
    });
}

module.exports = forecast;