const request = require('request-promise-native');

const fetchmyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {

  const ip = JSON.parse(body).ip;
  const urlIPWho = `http://ipwho.is/${ip}`;

  return request(urlIPWho);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;


  return request(url);
};

const nextISSTimesForMyLocation = function () {
  return fetchmyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      //console.log(response)
      return response;
    });

}

nextISSTimesForMyLocation()

module.exports = { fetchmyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };