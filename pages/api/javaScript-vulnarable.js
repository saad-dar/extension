import retire from 'retire';
import fetch from 'node-fetch';
import jsdom from 'jsdom';
import request from 'request';
const { JSDOM } = jsdom;
export default async function handler(req, res) {
    const websiteHtml = await scanWebsite('https://web-highlights.com/blog/how-to-build-a-chrome-extension-using-react/');

    // console.log(websiteHtml);
    const dom = new JSDOM(websiteHtml);

    const scripts = dom.window.document.querySelectorAll('script');
    const javascript = [];
    const vulnerableComponents = [];

    // extract javaScrpt components
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
    // console.log(javascript);
    let VulnerabilityResult = false;
    for (let i = 0; i < javascript.length; i++ ) {
    VulnerabilityResult = retire.isVulnerable(javascript[i]);
    if(VulnerabilityResult) {
        vulnerableComponents.push(javascript[i]);
    }
    }

    console.log(vulnerableComponents);
    res.status(200).json(vulnerableComponents);
}

async function scanWebsite(url) {
    const response = await fetch(url);
    const body = await response.text();
    // console.log(body);
    // const result = retire.scanUri(body);
    return body;
  }