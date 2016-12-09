var http = require('http');
var url = require('url');

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain', 'Autorization': 'auth'});
   
    var auth = request.headers['authorization'];
    var queryData = url.parse(request.url, true).query;
    var firstname =  queryData.fn;
    var lastname =  queryData.ln;
    
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    
    var cred = plain_auth.split(':');
    var username = cred[0];
    var password = cred[1];
    

   if(request.method=='POST') 
   {
        var body = [];
        request.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
                // at this point, `body` has the entire request body stored in it as a string
                response.end('Hi '+firstname+' '+lastname+'. This was an awesome request with query arguments! This is your provided e-mail address: '+body+', password: '+password); 
            });       
    }
    else
   {       
        response.end('Wow, this was an awesome '+request.method+' request. But you were requestesd to make a POST request.!\n'); 
   }
   
}).listen(process.env.PORT);
