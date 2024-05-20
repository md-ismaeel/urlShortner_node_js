import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        unique: true
    }
})

const urlModel = mongoose.model('urlData', urlSchema)

// module.exports = urlModel;
export default urlModel;