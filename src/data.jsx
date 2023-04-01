const data = [
  {
    id: 0,
    record: 'Main web traffic',
    description: 'This is the ip address of the server to which your domain will point',
    type: 'A',
    hostName: '@',
    value: null,
    ttl: '1800 (30 minutes)'
  },
  {
    id: 1,
    record: 'Web Traffic to www',
    description: 'This handles traffic to "www" e.g. "https://www.yourdomain.com". If your registrar allows, you can point this to the main domain, otherwise set up an A record to like the one for main web traffic',
    type: 'A',
    hostName: 'www',
    value: null,
    ttl: '1800 (30 minutes)'
  },
  {
    id: 2,
    record: 'SPF',
    description: 'For transactional email service: if this already exists combine with existing record NOTE: to include as a custom spf when a record already exists combine by using "v=spf1" & "~all" only once e.g: v=spf1 include:_spf.record1.com include:_spf.record2.com ~all',
    type: 'TXT',
    hostName: '@',
    value: 'v=spf1 MX include:_spf.elasticemail.com ~all',
    ttl: '3600 (1 hour)'
  },
  {
    id: 3,
    record: 'DKIM',
    description: 'DKIM sets a digital signature (header) to outgoing emails from your site, telling users that the email is authorized to be sent from your domain',
    type: 'TXT',
    hostName: 'api._domainkey',
    value: 'k=rsa;t=s;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbmGbQMzYeMvxwtNQoXN0waGYaciuKx8mtMh5czguT4EZlJXuCt6V+l56mmt3t68FEX5JJ0q4ijG71BGoFRkl87uJi7LrQt1ZZmZCvrEII0YO4mp8sDLXC8g1aUAoi8TJgxq2MJqCaMyj5kAm3Fdy2tzftPCV/lbdiJqmBnWKjtwIDAQAB',
    ttl: '3600 (1 hour)'
  },
  {
    id: 4,
    record: 'DMARC',
    description: 'DKIM sets a digital signature (header) to outgoing emails from your site, telling users that the email is authorized to be sent from your domain',
    type: 'TXT',
    hostName: '_dmarc',
    value: 'v=DMARC1;p=none;pct=100;aspf=r;adkim=r; ',
    ttl: '3600 (1 hour)'
  },
  {
    id: 5,
    record: 'Delivery Tracking',
    description: 'Used to track delivery errors',
    type: 'CNAME',
    hostName: 'tracking',
    value: 'api.elasticemail.com',
    ttl: '3600 (1 hour)'
  },
]

export default data