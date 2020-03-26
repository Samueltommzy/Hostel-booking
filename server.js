const app  = require("./index");
const port = 3000||process.env.PORT;
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("app listening on port " + port);
});