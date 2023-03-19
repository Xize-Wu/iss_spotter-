// iss.js
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const nextISSTimesForMyLocation = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    
    const urlIPWho = `http://ipwho.is/${ip}`;
    request(urlIPWho, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      const data = JSON.parse(body);

      if (!data.success) {
        const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
        callback(Error(message), null);
        return;
      }

      const coords = {
        "latitude": data["latitude"],
        "longitude": data["longitude"]
      };

      const lat = coords["latitude"];
      const lon = coords["longitude"];
      const url = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;
      request(url, (error, response, body) => {
        if (error) {
          callback(error, null);
          return;
        }
        if (response.statusCode !== 200) {
          callback(Error((`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null));
          return;
        }
        const data = JSON.parse(body).response;
        callback(null, data);
      });


        


    }
    );
    
  });

};






module.exports = { nextISSTimesForMyLocation };
