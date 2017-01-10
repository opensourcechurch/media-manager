var session = require('../models/session')
var user = require('../models/user')

//TODO: Add token refresh

module.exports = function(server, restify) {
	return function (req, res, next) {
    session.findOne({token:req.headers.token}, function(err, session){
			if (!session) {
				next(new restify.NotAuthorizedError('This resource requires authentication'))
			}
			user.findOne({_id:session.user_id}, function(err, user){
				req.userData = user
				next()
			})
    })
	}
}
