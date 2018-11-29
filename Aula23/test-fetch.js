const fetch = require('node-fetch')


fetch('http://localhost:9200/tasks/_search')
    .then(res => res.json())
    .then(json => console.log(json));