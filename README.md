# Dynamic IP address checker

Small script that checks the public IP using https://api.ipify.org?format=json and compares it to the previously stored IP address. It helps keep up with whether your ISP has assigned a new IP address for those who run scripts and other projects from inside their network, but need to be able to access them from outside the network.

ISPs charge as much as $25/month for a static IP, which is frankly absurd. By keeping this script running on a server within your network, you can have your most current IP address on hand. I'm using it to push to a Zapier hook, which uses my Gmail account to send the IP address to me.

## Settings
`settings.json`
Contains a JSON object with settings as described below.

- `outputFile [String]` The JSON file the most recent IP is stored in. _default: ip.json_
- `endpoint [String]` The endpoint to send the data to. _Field is required, no default._
- `interval [Number]` Number of milliseconds after which to check the IP. _default: 43200000 (12 hours)_