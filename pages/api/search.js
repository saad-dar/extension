var whoiser = require('whoiser')
import axios from 'axios'
export default async function handler(req, res) {
  // get IP/Domain reputation
  const options = {
    method: 'GET',
    url: 'https://domain-da-pa-check.p.rapidapi.com/',
    params: {target: req.query.keyword},
    headers: {
      'X-RapidAPI-Key': '0325c6e54fmshc40e10794e50ac4p13dddbjsne180515e07cc',
      'X-RapidAPI-Host': 'domain-da-pa-check.p.rapidapi.com',
      "content-type": "application/json"
    }
  };
  const host = 'whois.verisign-grs.com';
  try {
    // const autority = await axios.request(options);
    const domainInfo = await whoiser(req.query.keyword, {host, follow: 1});
    const response = {...domainInfo[host]}; //, ...autority.data.body
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
}
