// index.js

// The code below is temporary and can be commented out.
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass["risetime"]);
    console.log(`Next pass at ${datetime} for ${pass["duration"]}seconds.}`);
  }
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// let coord
// fetchCoordsByIP("70.54.37.38", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
//   coord = coordinates
//   return coordinates
// }
// )


// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(exampleCoords, (error, data)=>{
//   if(error){
//     console.log(`There's an error, buddy. ${error}`)
//   }

  

//   console.log('It worked! Returned flyover times:' , passTimes)

// })