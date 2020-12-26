
module.exports =  async(req, res) => {


	error = req.session.error

	
	res.render('index', {
		error: error
	})

}