const  mongoose = require('mongoose')
const moment = require('moment')

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    status:{
        type:String,
        enum:['open','close'],
        reuired: true,
        lowercase:true
    },
    date:{
        type:Date,
        default: () =>moment().subtract(10, 'days').calendar()
    },
    priority:{
        type:String,
        enum:['high','low','medium'],
        lowercase:true
    }
},{
    timestamps:true
}
)

const Issue = mongoose.model("Issue",IssueSchema)

module.exports = Issue;
