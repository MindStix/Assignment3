var http = require('http');
var fs = require('fs');

var Server = function()
{
	console.log('Server has started !');
}

Server.prototype.start = function(){

	http.createServer(function (req, res) {
	//check the request url	
	console.log("Received request url: " + req.url);
	//check if the requet is a get 
		if(req.method == 'GET')
		{
			fs.exists('./Image' + req.url, function (exists) 
            {
				if (exists) 
                  {
                      //read the json file
                        fs.readFile(req.url, function(error, data) 
                        {
                            if (error) 
                            {
                                //error notification to the user
								res.writeHead(500,{'content-type': 'text/html'});
								res.end('<h1>File reading error</h1>');
                            }
                              else
                              {
                                //write the data to the file
                                res.writeHead(200,{'content-type':'image/jpg'});
                                response.end(data);
                              }
                        }
                    }
		}

	}).listen(8080);
}

var myServer = new Server();
myServer.start();

