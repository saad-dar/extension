var whoiser = require('whoiser')
export default async function handler(req, res) {
  const host = 'whois.verisign-grs.com';
  try {
    const domainInfo = await whoiser(req.query.keyword, {host, follow: 1});
    // console.log(domainInfo[host]['Domain Name']);
    res.status(200).json(domainInfo[host])
  } catch (error) {
    console.log("Whoiser API is not responding");
    console.log(error);
  }
}
