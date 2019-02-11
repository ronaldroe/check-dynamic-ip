const axios = require('axios');
const fs = require('fs');

const settings = require('./settings.json');

console.log(settings);

console.log('Script started');



let theIP;

function getIP(){

  return axios.get('https://api.ipify.org?format=json')
  .then(res => res.data.ip);

}

theIP = JSON.parse(fs.readFileSync(settings.outputFile || './ip.json')).ip;

setInterval(() => {
  
  getIP().then(ip => {
    
    console.log(ip);
    
    if(ip !== theIP){
      
      axios.post(settings.endpoint, {
        ip: ip
      })
      .then(res => {
        console.log('changed');
        
        theIP = ip;
        
        fs.writeFileSync(settings.outputFile || './ip.json', '{"ip": "' + theIP + '"}');
      });
    
    } else {
      console.log('hasn\'t changed');
    };
  
  });

}, settings.interval || (86400000 / 2));