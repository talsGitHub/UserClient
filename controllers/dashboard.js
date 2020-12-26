const localStorage = require('webstorage-node').localStorage;
const request = require('request');

let token = localStorage.getItem("token");

function checkLoggedIn() {
    return new Promise(function (resolve, reject) {

      /* console.log("token: " + token)
        request({
            headers: {
              'x-access-token': token
            },
            uri: 'http://localhost:3000/users/checkLoggedIn',
            body: "",
            method: 'GET'
          },   function (err, res, body) {
                console.log(err,body)
                parsedBody = JSON.parse(body)
                console.log(parsedBody)
                
                if(parsedBody.key="error")
                {
                    currentUser = parsedBody.current_user
                    currentUserJSON = JSON.parse(currentUser)
                    name = currentUserJSON[0].name

                    if (!err && res.statusCode == 200) {
                        resolve(name);
                    } else {
                        reject(err);
                    }
                    
                }
                else{
           
                    if (!err && res.statusCode == 200) {
                        resolve(parsedBody.msg);
                    } else {
                        reject(err);
                    }

                }
         
       
          });*/


    });
  }



module.exports =  async(req, res) => {

    //let name = ""
    //let email = ""
   
   /* name = await checkLoggedIn();*/

    try{
        name = req.session.name
    }
    catch{
        name = "No name found"
    }

    try{
        email = req.session.email
    }
    catch{
        email = "No email found"
    }
   
	res.render('dashboard', {
        name: name,
        email: email
    })

}