//Created by Dhirendra Gupta at MindStix


//import required modules
var http = require('http');
var fs = require('fs');

//Sever class with constructor
var Server = function()
{
	console.log('Server has started !');
}

//The Sever.prototype property represents the Server prototype object.
//using Sever.prototype object create a start function as below 
Server.prototype.start = function()
{

	http.createServer(function (req, res) 
  {
	//check the request url	
	console.log("Received request url: " + req.url);
	
  //check if the requet is a get 
		if(req.method == 'GET')
		{
      //checking if reaquested image file exist or not
			fs.exists('./Image' + req.url, function (exists) 
            {
				if (exists) 
                  {
                      //read the image file
                        fs.readFile('./Image'+req.url, function(error, data) 
                        {
                            if (error) 
                            {
                                //display error to the user
								                res.writeHead(500,{'content-type': 'text/html'});
								                res.end('<h2>File reading error</h2>');
                            }
                              else
                              {
                                //display the data to the user
                                res.writeHead(200,{'content-type':'image/jpg'});
                                res.end(data);
                              }
                     
                        });
                    }

                    else
                    {
                       //if requested image file does not exist display error to the user
                        res.writeHead(404, {'content-type':'text/html'});
                        res.end('<h2>This Page Not found, Please check your URL</h2>');
                    }
            });
    }

    else
    {
      //If the request is other than GET it will be traeted as Bad request
      res.writeHead(401,{'content-type':'text/html'});
      res.end('<h2>This is a bad request</h2>')
    }
    
	}).listen(8000, function(){
    console.log('Listening to port number 8000 !')
  });
}

//create a Server object and start it.
var myServer = new Server();
myServer.start();