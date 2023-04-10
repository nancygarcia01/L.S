
const fs = require("fs");
const path= require("path");

const fileUpload = (file, namePath) => {
try {
    let matches = file.match(/^data:(.+);base64,(.+)$/);
    
    let response ={};
    if(matches.length !== 3)
    return new Error("inValid  input string file base64");
    response.type=matches[1];

   let extension= response.type.split("/");
   extension=extension[1]
   response.data= Buffer.from(matches[2], "base64");

   if(!fs.existsSync(`${path.dirname(require.main.filename)}/server/public`)
   ) {
    fs.mkdirSync( 
        `${path.dirname(require.main.filename)}/server${namePath}`,
    true
    );
   
   };
    let fileName = `${new Date().getTime()}.${extension}`;

   fs.writeFileSync(`${path.dirname(
    require.main.filename)}/server${namePath}/${fileName}`,
   response.data,
   {
    encoding: "utf8",
   }
   );
   return `${namePath}, ${fileName}`;
} catch (error) {
    console.log(error)
    return new Error ("internal server error")
    
}
};

module.exports = {fileUpload};
