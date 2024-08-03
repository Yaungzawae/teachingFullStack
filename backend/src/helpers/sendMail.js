const { transporter } = require("../config/nodemailer.config");
const path = require("path");

module.exports.sendMail = async(receiver,subject, data, attachments)=>{
    const assetPath = path.join(__dirname, "../views/Assets")
    const attachmentsData = [];
    if(attachments){
        attachments.forEach(({filename,cid}) => attachmentsData.push({
            filename, cid, path: `${assetPath}/${filename}`
        }))
    } 
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: receiver,
        subject: subject,
        html: data,
        attachments: attachmentsData
      });
    return 
} 