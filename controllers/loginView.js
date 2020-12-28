
module.exports =  async(req, res) => {

	result = req.result
	console.log("res: " + result)
	res.render('login', {
		result:result

	})

}