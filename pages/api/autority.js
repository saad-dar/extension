import axios from 'axios'

export default async function handler(req, res) {
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
      try {
        const autority = await axios.request(options);
        res.status(200).json(autority.data);
      } catch (error) {
        console.error(error);
      }
  }