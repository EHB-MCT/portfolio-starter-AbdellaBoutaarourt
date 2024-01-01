const express = require("express");
const app = express();
/**
 * @param
 * @return
 */

app.get("/",(req,res) =>{

    res.send({message:"hello world!"})
})


app.listen(3000,(err) => {
    if(!err){
        console.log("running on port " + 3000);
    }
    else{
        console.error(err)
    }
})