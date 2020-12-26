const localStorage = require('webstorage-node').localStorage;
const request = require('request');
//var session = require('client-sessions');
var session = require('express-session')

//let token = localStorage.getItem("token");
let parsedName = ""
let parsedEmail = ""

function checkLoggedIn(token) {
    return new Promise(function (resolve, reject) {

       console.log("token: " + token)
        request({
            headers: {
              'x-access-token': token
            },
            uri: 'http://localhost:3000/users/checkLoggedIn',
            body: "",
            method: 'GET'
          },   function (err, res, body) {
                
                parsedBody = JSON.parse(body)
           
                
                if(parsedBody.msg != "Not logged in")
                
                {
                    currentUser = parsedBody.current_user
                    currentUserJSON = JSON.parse(currentUser)
                    name = currentUserJSON[0].name
                    email = currentUserJSON[0].email
                    
                    parsedName = name
                    parsedEmail = email

                    

                    if (!err && res.statusCode == 200) {
                        //localStorage.setItem("name", name);
                     //   localStorage.setItem("email", email);
                        resolve(true);
                    } else {
                        reject(parsedBody.msg);
                    }
                    
                }
                else{
           
                    if (!err && res.statusCode == 200) {
                        resolve(parsedBody.msg);
                    } else {
                        reject(parsedBody.msg);
                    }

                }
         
       
          });


    });
  }



module.exports =  async(req, res, next) => {

    let name = ""
    let token = req.session.token
    
    if (!token){
        result = "Not Logged In"
    }
    else{
        result = await checkLoggedIn(token);
        req.session.name = parsedName
        req.session.email = parsedEmail
        req.session.error = null
        
    }
    
    console.log("auth result: " + result)
    if (result != true){
        req.session.error = result
        console.log("ERO: " + req.session.error)
        return res.redirect('/')
    }

	next()

}