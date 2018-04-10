//建立movie的数据模型
const mongoose = require('mongoose');

const Schema = mongoose.Schema; //获取mongoose上的建模函数Schema
const {
	ObjectId,
	Mixed
} = Schema.Types


const categorySchema = new Schema({
	name: {
		unique: true,
		type: String
	},
	movies: [{
		type: ObjectId,
		ref: "Movie"
	}],
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
categorySchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now()
	} else {
		this.meta.updatedAt = Date.now()
	}

	next()
})
mongoose.model("Category", categorySchema);