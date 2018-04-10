//建立movie的数据模型
const mongoose = require('mongoose');

const Schema = mongoose.Schema; //获取mongoose上的建模函数Schema
const {
	ObjectId,
	Mixed
} = Schema.Types


const movieSchema = new Schema({
	doubanId: {
		unique: true,
		type: String
	},
	category: [{
		type: ObjectId,
		ref: "Category"
	}],
	rate: Number,
	title: String,
	summary: String,
	video: String,
	poster: String,
	cover: String,

	videoKey: String,
	posterKey: String,
	coverKey: String,

	rawTitle: String,
	movieTyoes: [String],
	pubdate: Mixed,
	year: Number,
	tags: [String],
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()

		}
	}

})
movieSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now()
	} else {
		this.meta.updatedAt = Date.now()
	}

	next()
})
mongoose.model("Movie", movieSchema);