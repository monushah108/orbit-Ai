

const roomSchema = new Schema({
    roomId : {
        type : Schema.Types.ObjectId,
        ref : "Room",
        required : true 
    },
    visibility : {
        type : String ,
        enum : ["private" , "public"],
        default : "public"
    },
    duration : {
        type : number , 
        enum : ["2hr" , "1day" , "10min"],
        default : "2hr"
    },
    expiryAt : {
        type : Date ,
        
    }
})