
const localStorage = require('webstorage-node').localStorage;
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
						parsedBody = JSON.parse(body)
						token = parsedBody["msg"]
						console.log("Token: " + token)
						//localStorage.setItem("token", token);
						req.session.token = token
						//res.render('dashboard', {})
						return res.redirect('/dashboard')
				}
				
			}
		);
	}
	catch(e){
			console.log("error with login " + e)
	}
	 

}