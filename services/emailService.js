import  nodemailer  from "nodemailer"

export async function emailService(host, port, username, password,messageData) {
    //create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: true,
        auth: { user: username, pass: password },
    });

    //create the email message details to be sent
    let message = {
        from: `"${messageData.name}" <${messageData.from}>`, // sender name and address
        to: `${messageData.to}`, // list of receivers
        cc: `${messageData.cc}`, // cc recipients
        bcc: `${messageData.bcc}`, // bcc recipients
        subject: messageData.subject, // Subject line
        text: messageData.body, // plain text body
        html: `"<b>${messageData.body}</b>"`, // html body
    };

  return await transporter.sendMail(message);//send the email
}


