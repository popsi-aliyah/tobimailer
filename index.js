require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;
const useremail = process.env.USER;
const password = process.env.PASSWORD;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log("Server Running"));


// const express = require('express')
// const app = express()
// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
// app.listen(process.env.PORT || 3000)

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
    auth: {
      user: useremail,
      pass: password
    }
  });

transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  router.all("/", (req, res) => {
    console.log(`user email ${useremail} pass ${password}`);
    const email = req.body.email;
    const subject = req.body.subject;
    const bd=req.body.cont;

    const drinkname=req.body.drinkname;
    const ordercode=req.body.ordercode;
    const drankeename=req.body.drankeename;
    const club=req.body.club;
    const amount=req.body.amount;
    const mail = {
      from:useremail,
      to:email,
      subject: subject,
      text:'H'
       
//       html: `
//       <!DOCTYPE html>
//       <html>
      
//       <head>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   margin: 0;
//                   padding: 0;
//                   background-color: #f3f9ff;
//               }
      
//               #container {
//                   max-width: 700px;
//                   background-color: #ffffff;
//                   border: 2px solid #C4C4C4;
//                   border-radius: 20px;
//                   margin: 0 auto;
//               }
      
//               #header {
//                   background-color: #007bff;
//                   border-radius: 20px 20px 0 0;
//                   text-align: center;
//               }
      
//               #header img {
//                   width: 200px;
//                   height: 200px;
//                   padding: 20px;
//               }
      
//               #order-details {
//                   padding: 30px;
//               }
      
//               #order-details h2 {
//                   font-weight: 800;
//                   font-size: 1.5rem;
//               }
      
//               .detail-row {
//                   display: flex;
//                   justify-content: space-between;
//                   margin: 10px 0;
//               }
      
//               .detail-label {
//                   font-weight: 600;
//               }
//           </style>
//       </head>
      
//       <body>
//           <div id="container">
//               <div id="header">
//                   <a href="http://www.drankonme.com/" target="_blank">
//                       <img src="https://i.ibb.co/n7w4FcG/IMG-7623-2.png" alt="Drank On Me Logo">
//                   </a>
//               </div>
      
//               <div id="order-details">
//                   <h2>Order Details</h2>
//                   <div class="detail-row">
//                       <span class="detail-label">Drink Name:</span>
//                       <span>${drinkname}</span>
//                   </div>
//                   <div class="detail-row">
//                       <span class="detail-label">Order Code:</span>
//                       <span>${ordercode}</span>
//                   </div>
//                   <div class="detail-row">
//                       <span class="detail-label">Amount:</span>
//                       <span>${amount}</span>
//                   </div>
//                   <div class="detail-row">
//                       <span class="detail-label">Drinker Name:</span>
//                       <span>${drankeename}</span>
//                   </div>
//                   <div class="detail-row">
//                       <span class="detail-label">Club Name:</span>
//                       <span>${club}</span>
//                   </div>
//               </div>
//           </div>
//       </body>
      
//       </html>
      
// `,
    };
    transporter.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });


  router.all("/book", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const subject = req.body.subject;
    const ticketType = req.body.ticketType;
    const bookingId = req.body.bookingId;
        const mail = {
          from: email,
          to: useremail,
          subject: subject,
          html: `
          <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
          <div style="max-width: 700px; background-color: white;border: 2px solid #C4C4C4;border-radius:20px; margin: 0 auto">
          <div style="width: 100%; height: 100px; border-radius:20px 20px 0px 0px; justify-content: center;text-align: center;">
          <a href="http://www.r16services.com/" target="_blank"><img
              src="https://firebasestorage.googleapis.com/v0/b/root16-3979e.appspot.com/o/root_16-removebg-preview.png?alt=media&token=75e81206-ee9d-4fc1-b310-23e4abe162e5"
              style="width: 200px; height: 200px; "
            /></a>
          </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
              <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                ROOT16 feedback Form
              </p>
              <div style="font-size: .8rem; margin: 0 30px">
                <p>Name: <b>${name}</b></p>
                <p>Email: <b>${email}</b></p>
                <p>Phone No: <b>${phoneNumber}</b></p>
                <p>Booking Id: <b>${bookingId}</b></p>
                <p style="font-size: 20px;">Ticket Type: <i>${ticketType}</i></p>
              </div>
            </div>
          </div>
        </div>
    `,
        };
      transporter.sendMail(mail, (error) => {
        if (error) {
          res.json({ status: "ERROR" });
        } else {
          res.json({ status: "Message Sent" });
        }
      });
    
    });
