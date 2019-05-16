const mongoose  = require("mongoose");

const url = "mongodb+srv://NHI-NGUYEN_97:nhinguyen040197@@cluster0-odomf.mongodb.net/order?retryWrites=true";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});
let db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("Connected succesfully to server");
});