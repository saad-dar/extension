var whoiser = require('whoiser')
import axios from 'axios'
import retire from 'retire';
import fetch from 'node-fetch';
import jsdom from 'jsdom';
import request from 'request';
const { JSDOM } = jsdom;

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

    // extract javaScript vulnarable components
    const websiteHtml = await scanWebsite(req.query.keyword);
    const dom = new JSDOM(websiteHtml);
    const scripts = dom.window.document.querySelectorAll('script');

    const javaScriptComp = javaScriptComponents(scripts);
    const vulnarableComp = vulnarableComponents(javaScriptComp);
    console.log(vulnarableComp);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
}

async function scanWebsite(url) {
  const response = await fetch(url);
  const body = await response.text();
  // console.log(body);
  // const result = retire.scanUri(body);
  return body;
}

async function javaScriptComponents(scripts) {
  const javascript = [];
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    if (script.src) {
      // Fetch external script source code using request module
      request(script.src, (error, response, body) => {
        if (error) {
          console.error(`request error: ${error}`);
          return;
        }
        javascript.push(body);
      });
    } else {
      // Add inline script source code to array
      javascript.push(script.innerHTML);
    }
  }
  return javascript;
}

async function vulnarableComponents(javascript) {
  const vulnerableComponents = [];
  let VulnerabilityResult = false;
  for (let i = 0; i < javascript.length; i++ ) {
    VulnerabilityResult = retire.isVulnerable(javascript[i]);
    if(VulnerabilityResult) {
      vulnerableComponents.push(javascript[i]);
    }
  }
}