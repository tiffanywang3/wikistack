var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var statuses = ['open', 'closed'];
var pageSchema = new Schema({
	title:  {type: String, required: true}, 
	urlTitle: {type: String, required: true}, 
	content: {type: String, required: true}, 
	date: {type: Date, default: Date.now}, 
	status: {type: String, enum: statuses}, 
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});


var userSchema = new Schema({
	name:  {type: String, required: true}, 
	email:  {type: String, required: true, unique: true}
});

var User = mongoose.model('User', userSchema);
var Page = mongoose.model('Page', pageSchema);

pageSchema.virtual('urlTitle.route').get(function(){
	return '/wiki/' + this.urlTitle; //backslashes might not work
})

Page.findAll().populate('author').exec()
.then(function(pages){
	//console.log(pages);
});




module.exports = {
  Page: Page,
  User: User
};


























