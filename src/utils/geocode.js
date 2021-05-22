const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic25laGFtb3J5ZSIsImEiOiJja29jd25xZ3YxcnJzMnBtdWM5aGZ3ZDEyIn0.ZOn4I9KgddwhSWKgsMUBbA&limit=1';

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect location services!', undefined);
        } else if ( response.body.features.length === 0 ) {
            callback('Unable to find the location try again with different term!', undefined);
        } else {
            const [ longitude, latitude ] = response.body.features[0].center;
            callback(undefined, {
                longitude,
                latitude,
                location: response.body.features[0].place_name,
            });
        }
    }); 
}

module.exports = geocode;