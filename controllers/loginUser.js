
const localStorage = require('webstorage-node').localStorage;
const loginViewController = require('./loginView');
//var session = require('client-sessions');


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
						//parsedBody = JSON.parse(parsedBody)
						
						if(!parsedBody["key"])
						{
							parsedBody = JSON.parse(parsedBody)
						}
						token = parsedBody["msg"]
						
						
						if(token == "Incorrect password"){
							console.log("no such password")
							result = "Invalid Password"
							//return res.redirect('/login/?result=' + result)
						}
						else if(token == "No such user"){
							console.log("no such user")
							result = "Invalid User"
							//return res.redirect('/login/?result=' + result)
						}
						else{
							//localStorage.setItem("token", token);
							req.session.token = token
							//res.render('dashboard', {})
							return res.redirect('/dashboard')
						}
						
						
				}

				console.log("R: " + result)
				if(result){
					req.result = result
					return loginViewController(req, res);
				}
				
			}
		);
		
	}
	catch(e){
			console.log("error with login " + e)
	}
	 

}