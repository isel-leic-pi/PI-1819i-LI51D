const request = require('request')

//request.debug = true


module.exports = function(program) {
    return {
        get: get,
        createIndex: createIndex,
        listIndices: listIndices
    }
    
    
    function get(path = '/') {
        request(new Options(program, path), handleResponse.bind(this))
    }
    
    function createIndex() {
        if (!program.index) {
            const msg = 'No index specified! Use --index <name>'
            if (!program.json) throw Error(msg)
            console.log(JSON.stringify({error: msg}))
            return;
        }
        
        request(new Options(program, '?pretty=true', 'PUT'), handleResponse.bind(this));
        
        
        
    }

    function listIndices() {
        request(new Options(program, program.json ? '_all' : '_cat/indices?v'), handleResponse.bind(this));
    }
}


function Options(program, path = '/', method = 'GET') {
    this.method =  method
    this.url =  fillUrl(program, path)
    this.json =  program.json || false

    console.log(`making request with options`)
    console.log(this)

}

function fillUrl(config, path = '') {
    const index = config.index ?  `/${config.index}` : ''
    const type = config.type ?  `/${config.type}` : ''
    let fullPath = `${index}${type}/${path}`
    fullPath = fullPath.replace("//", "/")

    console.log(`fullPath = ${fullPath}`)

    return `http://${config.host}:${config.port}${fullPath}`

}

function handleResponse(err, rsp, body) {
    if(this.json) {
        console.log(JSON.stringify(err || body))
        return
    } 
    if(err) {
        throw err
    }
    console.log(body)

}
