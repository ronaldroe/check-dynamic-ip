const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

console.log('Script started');

const oneDay = 1000 * 60 * 60 * 24;

let theIP;

function getIP(){

  // return JSDOM.fromURL('http://www.ip4.me/', {includeNodeLocations: true})
  // .then(res => {
  //   return res.window.document.querySelector('body > center > table > tbody > tr:nth-child(2) > td > font').innerHTML;
  // });

  return axios.get('https://api.ipify.org?format=json')
  .then(res => res.data.ip);

}

theIP = JSON.parse(fs.readFileSync('./ip.json')).ip;

setInterval(() => {
  
  getIP().then(ip => {
    
    console.log(ip);
    
    if(ip !== theIP){
      
      axios.post('https://hooks.zapier.com/hooks/catch/2581951/xjrw88/', {
        ip: ip
      })
      .then(res => {
        console.log('changed');
        
        theIP = ip;
        
        fs.writeFileSync('./ip.json', '{"ip": "' + theIP + '"}');
      });
    
    } else {
      console.log('hasn\'t changed');
    };
  
  });

}, 5000);