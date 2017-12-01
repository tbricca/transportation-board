// var mongoose = require('mongoose');
// var Schema = mongoose.Schema

// var favoriteSchema = new Schema({
//     address: string,
//     user: {
//         type: Schema.ObjectId, 
//         ref:"user"
//     }
// })

// mongoose.model('favorite', favoriteSchema);

var mongoose = require('mongoose');
var Schema	 = mongoose.Schema;

var todoSchema = new Schema({
	task: String,
	status: { type: String, default: 'new' },
	user: {
		type: Schema.ObjectId,
		ref:"user"
	},
	date: { type: Date, default: Date.now }
});

mongoose.model('todo', todoSchema);