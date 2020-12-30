
module.exports =  async(req, res) => {

	result = req.result
	
	res.render('login', {
		result:result

	})

}