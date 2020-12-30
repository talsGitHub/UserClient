
const localStorage = require('webstorage-node').localStorage;
const loginViewController = require('./loginView');



module.exports =  async(req, res) => {

	console.log(req.body)
	
	try{
		var request = require('request'),
			username = req.body.email,
			password = req.body.password,
			url = "http://" + username + ":" + password + "@localhost:3000/users/login";

		request(
			{
				url : url
			},
			function (error, response, body) {
				if(error)
				{
					console.log("error: " + error)
					res.render('/dashboard', {})
				}
				else{
					
						console.log("body: " + body)
						parsedBody = JSON.parse(body)
						
						
						if(!parsedBody["key"])
						{
							parsedBody = JSON.parse(parsedBody)
						}
						token = parsedBody["msg"]
						
						
						if(token == "Incorrect password"){
							//console.log("no such password")				//DEBUG
							result = "Invalid Password"
							
						}
						else if(token == "No such user"){
							//console.log("no such user")					//DEBUG
							result = "Invalid User"
							
						}
						else{
							req.session.token = token
							return res.redirect('/dashboard')
						}
						
						
				}

				
				if(result){
					req.result = result
					return loginViewController(req, res);
				}
				
			}
		);
		
	}
	catch(e){
			console.log("Error with login process " + e)
	}
	 

}