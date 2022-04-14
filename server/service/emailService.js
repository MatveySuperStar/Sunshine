const nodemailer = require('nodemailer')

class EmailService {
  
  constructor() {
    this.transporter = nodemailer.createTransport( {

        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      }
    ) 
  }

  async sendMessageMail(from, message, name, phone, kurs) {
    console.log(process.env.SMTP_USER)
    const a = await this.transporter.sendMail({
      from: from,
      to: process.env.SMTP_USER,
      subject: `Письмо от ${name}, телефон: ${phone}, email: ${from}`,
      text: `${kurs !== undefined ? "Предпочетаемый курс;"+kurs : ''}</br>
      ${message}`
    })

    return a
  }
}

module.exports = new EmailService()