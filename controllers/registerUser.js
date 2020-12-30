const querystring = require('querystring');
const { curly } = require('node-libcurl');
const request = require('request');
const homepageController = require('./homePage');


function login(email, pwd, name, req, res) {
    return new Promise(function (resolve, reject) {
        try{
            var request = require('request'),
                username = email,
                password = pwd,
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
                            
                            
                            if(!parsedBody["key"])
                            {
                                parsedBody = JSON.parse(parsedBody)
                            }
                            token = parsedBody["msg"]
                            
                            req.session.token = token
                            req.session.name = name
                            req.session.email = email
                            req.firstTime = true
                            
                            return res.redirect('/dashboard')
                            
                            
                            
                    }
    
                }
            );
            
        }
        catch(e){
                console.log("error with login " + e)
        }




    });
  }





module.exports =  async(req, res) => {

    

    success = false
    name = req.body.name
    email = req.body.email
    password = req.body.password
    confirmPassword = req.body.confirmPassword
  
    name = name.replace(/ /g, "%20")

    //request register endpoint
    try{
        url = 'http://localhost:3000/users/signup?name=' + name + '&email=' + email + '&password=' + password + '&confirmPassword=' + confirmPassword

            const { statusCode, data, headers } = await curly.post(url, {
        postFields: querystring.stringify({}),
        
        })

        result = JSON.parse(data)
    
        if(result["key"] == "token")
        {
            
            success = await login(email, password, name, req, res)
           
            
 
        }
        else
        {
            console.log("Error registering the account: " + result["msg"])
        }
        

    }
    catch(e)
    {
        console.log("ERROR: " + e)

    }


    req.body = req.body
    req.result = result["msg"]

    return homepageController(req, res)

}