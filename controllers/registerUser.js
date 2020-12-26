const querystring = require('querystring');
const { curly } = require('node-libcurl');
const request = require('request');
const localStorage = require('webstorage-node').localStorage;

let parsedToken = ""

function login(email, pwd, name) {
    return new Promise(function (resolve, reject) {
                    console.log("login: " + email + " : " + pwd)

                   //request login endpoint
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
                                console.log("E: " + error)
                            }
                            else{
                                    
                                    
                                    parsedBody = JSON.parse(body)
                                    //console.log("AP::" + parsedBody["msg"])
                                    token = parsedBody["msg"]
                                    
                                    parsedToken = token
                                    
                                   
                                    resolve(true);
                                    
                                   
                            }
                            
                        }
                    );
                }
                catch(e){
                        console.log("error with login " + e)
                        reject(false);
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
    console.log(name + " : " + email + " : " + password + " : " + confirmPassword)
    //request register endpoint
    try{
        url = 'http://localhost:3000/users/signup?name=' + name + '&email=' + email + '&password=' + password + '&confirmPassword=' + confirmPassword

            const { statusCode, data, headers } = await curly.post(url, {
        postFields: querystring.stringify({}),
        
        })

        result = JSON.parse(data)
    
        console.log("RESS: " + result["msg"])
        console.log("key: " + result["key"])
        if(result["key"] == "token")
        {
            
            success = await login(email, password, name)
            
 
        }
        else
        {
            console.log("error with register: " + result["msg"])
        }
        

    }
    catch(e)
    {
        console.log("ERROR: " + e)

    }

   
    if (success == true){
        req.session.token = parsedToken
        req.session.name = name
        req.session.email = email
        res.render('dashboard', {
            name: name,
            email: email
        })
    }
    else{
        res.render('index', {

        })
    }
    



}