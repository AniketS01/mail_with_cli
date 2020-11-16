const inquirer = require('inquirer');
const PasswordPrompt = require('inquirer/lib/prompts/password');
const nodemailer = require('nodemailer')
const colors = require('colors')

inquirer
  .prompt([
    {
        type: String,
         name: "email",
          message:"what is your email?"
    },
    {
        type:'password',
        name:'pass',
        message:'enter your password'
    },
    {
        type:String,
        name:'toemail',
        message:'to: '
    },
    {
        type:String,
        name:'subject',
        message:'subject: '
    },
    {
        type:String,
        name:'text',
        message:'text: '
    },
  ])
  .then(answers => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: answers.email,
            pass: answers.pass,
        }
    });
    
    const info = {
        to:answers.toemail,
        subject:answers.subject,
        text:answers.text
    }
    
    transporter.sendMail(info, (error, info) => {
        if(error) {
            console.log(error)
        }
        else{
            console.log('Success!!'.green +" "+ (info.response).yellow)
        }
    })
  })
  .catch(error => {
    if(error){
        console.log(error)
    }
  });
