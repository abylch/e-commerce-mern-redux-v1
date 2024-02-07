// controllers/emailController.js
import nodemailer from 'nodemailer';
import asyncHandler from '../middleware/asyncHandler.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendOrderInfoEmail = asyncHandler(async (req, res) => {
  try {
    // Access user information from the request object
    console.log("emailController .env mail:", process.env.EMAIL_USER);
    const { cartState, userInfo } = req.body;
    console.log('cartState from emailController.js:', cartState);
    console.log('userInfo from emailController.js:', userInfo);
    const userName = req.user.name;
    const userEmail = req.user.email;
    const user = { name: userName, email: userEmail };
    console.log('user from emailController.js:', user);


    // Check if the user is authenticated
    if (!user) {
      res.status(401).json({ success: false, message: 'Not authorized, no user information' });
      return;
    }

    // Build email content based on cartState and user information
    const emailContent = buildEmailContent(cartState, user);

    // Send mail with defined transport object
    const info = await transporter.sendMail(emailContent);

    console.log('Order information email sent successfully.');
    res.status(200).json({ success: true, messageId: info.messageId });


    // Placeholder function for email content building
function buildEmailContent(cartState, user) {
    // Implement your logic to build the email content based on cartState and user information
    return {
      from: '"Your e-Shop-Shop" <exintraders@bylch.com>',
      to: user.email,
      cc: 'exintraders@bylch.com',
      subject: 'Inquiry Information - Product/s, Payment...',
      text: `Thank you, ${user.name}, for your inquiry! Here are the details: ${JSON.stringify(cartState)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <p style="color: #333; text-align: center;">This is a test. It is not a real inquiry.</p>
          <p style="text-align: center;">Thank you, ${user.name}, for your inquiry about product information, payment, and more!</p>
          <p style="text-align: center;">We'll get back to you as soon as possible!</p>
          <hr style="border: 1px solid #ddd;">

          <h3>Inquiry Details</h3>
          <p><strong>Order ID:</strong> ${cartState.orderId}</p>

          <h3>Products</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${cartState.cartItems.map((item, index) => (
                `<tr key=${index}>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.qty}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">$${Number(item.price).toFixed(2)}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">$${Number(item.qty * item.price).toFixed(2)}</td>
                </tr>`
              )).join('')}
            </tbody>
          </table>

          <h3>Total Summary</h3>
          <p><strong>Items Price:</strong> $${Number(cartState.itemsPrice / 0.83).toFixed(2)}</p>

          <h3>Shipping Address</h3>
          <p><strong>Address:</strong> ${cartState.shippingAddress.address}</p>
          <p><strong>City:</strong> ${cartState.shippingAddress.city}</p>
          <p><strong>Postal Code:</strong> ${cartState.shippingAddress.postalCode}</p>
          <p><strong>Country:</strong> ${cartState.shippingAddress.country}</p>

          <p><strong>Payment Method:</strong> ${cartState.paymentMethod}</p>
          <p><strong>Order Status:</strong> ${cartState.orderStatus}</p>
          <p><strong>Order Date:</strong> ${cartState.orderDate}</p>

          <p style="text-align: center; margin-top: 20px; color: #888;">We appreciate your interest in our products!</p>
        </div>
      `,
    };
  }


  } catch (error) {
    console.error('Error sending order information email:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send order information email' });
  }
}
);

const sendOrderConfirmationEmail = asyncHandler(async (req, res) => {
  try {
    // Access user information from the request object
    console.log("sendOrderConfirmationEmail emailController .env mail:", process.env.EMAIL_USER);
    const { orderState, userInfo } = req.body;
    console.log('orderState from sendOrderConfirmationEmail emailController.js:', orderState);
    console.log('userInfo from sendOrderConfirmationEmail emailController.js:', userInfo);
    const userName = req.user.name;
    const userEmail = req.user.email;
    const user = { name: userName, email: userEmail };
    console.log('user from sendOrderConfirmationEmail emailController.js:', user);


    // Check if the user is authenticated
    if (!user) {
      res.status(401).json({ success: false, message: 'Not authorized, no user information' });
      return;
    }

    // Build email content based on orderState and user information
    const emailContent = buildEmailContent(orderState, user);

    // Send mail with defined transport object
    const info = await transporter.sendMail(emailContent);

    console.log('Order confirmation email sent successfully.');
    res.status(200).json({ success: true, messageId: info.messageId });


    // Placeholder function for email content building
function buildEmailContent(orderState, user) {
    // Implement your logic to build the email content based on cartState and user information
    return {
      from: '"Your e-Shop-Shop" <exintraders@bylch.com>',
      to: user.email,
      cc: 'exintraders@bylch.com',
      subject: `Order ${orderState._id} Confirmation Status`,
      text: `Thank you, ${user.name}, for making an order! Here are the details: ${JSON.stringify(orderState)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <p style="color: #333; text-align: center;">This is a test. It is not a real order confirmation.</p>
          <p style="text-align: center;">Thank you, ${user.name}, for making an order!</p>
          <hr style="border: 1px solid #ddd;">

          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${orderState._id}</p>
          <p><strong>Order Status:</strong> ${orderState.isPaid ? 'Paid' : 'Pending Payment'}</p>

          <h3>Products</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderState.orderItems.map((item, index) => (
                `<tr key=${index}>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.qty}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">$${Number(item.price).toFixed(2)}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">$${Number(item.qty * item.price).toFixed(2)}</td>
                </tr>`
              )).join('')}
            </tbody>
          </table>

          <h3>Total Summary</h3>
          <p><strong>Items Price before Tax:</strong> $${Number(orderState.itemsPrice).toFixed(2)}</p>
          <p><strong>Shipping Price:</strong> $${Number(orderState.shippingPrice).toFixed(2)}</p>
          <p><strong>Total Order Price:</strong> $${Number(orderState.totalPrice).toFixed(2)}</p>

          <h3>Payment Details</h3>
          <p><strong>Payment Method:</strong> ${orderState.paymentMethod}</p>

          <h3>Order Date</h3>
          <p>${new Date(orderState.updatedAt).toLocaleString()}</p>

          <h3>Shipping Address</h3>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Address:</strong> ${orderState.shippingAddress.address}</p>
          <p><strong>City:</strong> ${orderState.shippingAddress.city}</p>
          <p><strong>Postal Code:</strong> ${orderState.shippingAddress.postalCode}</p>
          <p><strong>Country:</strong> ${orderState.shippingAddress.country}</p>

          ${!orderState.isPaid ? '<p style="color: red; font-weight: bold; margin-top: 20px;">Please note: Your order is not paid. Process the payment as soon as possible to ensure timely processing.</p>' : ''}

          <p style="text-align: center; margin-top: 20px; color: #888;">We appreciate your business!</p>
        </div>
      `,
    };
  }


  } catch (error) {
    console.error('Error sending order information email:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send order information email' });
  }
}
);

// Define the function to send a welcome email
const sendWelcomeEmail = asyncHandler(async (req, res) => {
  try {

    const userName = req.user.name;
    const userEmail = req.user.email;
    const user = { name: userName, email: userEmail };
    console.log('user from sendWelcomeEmail emailController.js:', user);


      // Build the welcome email content
      const emailContent = buildWelcomeEmailContent(user);

      // Send the email with the defined transport object
      const info = await transporter.sendMail(emailContent);

      console.log('Welcome email sent successfully.');
      res.status(200).json({ success: true, messageId: info.messageId });
      // You might return info or any other relevant data if needed

      // Placeholder function for building the welcome email content
      function buildWelcomeEmailContent(user) {
        return {
            from: '"Your e-Shop-Shop" <exintraders@bylch.com>',
            to: user.email,
            cc: 'exintraders@bylch.com',
            subject: 'Welcome to Your e-Shop-Shop!',
            text: `Hello ${user.name}, welcome to Your e-Shop-Shop! We're excited to have you on board.`,
            html: `
                <p>Hello ${user.name}, this is a test</p>
                <p>Dear ${user.name},</p>
                <p>Thank you for your registration!</p>
                <p>Welcome to Your e-Shop-Shop! We're thrilled to have you as a new member.</p>
                <p>Thank you for joining us!</p>
                <p>Best regards,</p>
                <p>Your e-Shop-Shop Team</p>
            `,
        };
      }

  } catch (error) {
      console.error('Error sending welcome email:', error.message);
      // Handle the error as needed
  }
});

// Define the function to send a paid invoice email
const sendPaidInvoiceEmail = asyncHandler(async (req, res) => {
  try {
    // Access user information and order state from the request object
    const { orderState, userInfo } = req.body;

    // Build email content based on orderState and user information
    const emailContent = buildPaidInvoiceEmailContent(orderState, userInfo);

    // Send mail with the defined transport object
    const info = await transporter.sendMail(emailContent);

    console.log('Paid invoice email sent successfully.');
    return res.status(200).json({ success: true, messageId: info.messageId });
    

    // Placeholder function for building the paid invoice email content
    function buildPaidInvoiceEmailContent(orderState, userInfo) {
      return {
        from: '"Your e-Shop-Shop" <exintraders@bylch.com>',
        to: userInfo.email,
        cc: 'exintraders@bylch.com',
        subject: `Paid Invoice for Order ${orderState._id}`,
        text: `Thank you for your payment. Here is your paid invoice: ${JSON.stringify(orderState)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <p style="color: #333; text-align: center;">This is a test. It is not a real order confirmation.</p>
            <h2 style="color: #333; text-align: center;">Invoice</h2>
            <p style="text-align: right; margin-bottom: 20px;">Date: ${new Date(orderState.updatedAt).toLocaleDateString()}</p>
            <hr style="border: 1px solid #ddd;">

            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${orderState._id}</p>
            <p><strong>Order Status:</strong> Paid</p>

            <h3>Products</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #f2f2f2;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Quantity</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Price</th>
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${orderState.orderItems.map((item, index) => (
                  `<tr key=${index}>
                    <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${item.qty}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">$${Number(item.price).toFixed(2)}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">$${Number(item.qty * item.price).toFixed(2)}</td>
                  </tr>`
                )).join('')}
              </tbody>
            </table>

            <h3>Total Summary</h3>
            <p><strong>Items Price before Tax:</strong> $${Number(orderState.itemsPrice).toFixed(2)}</p>
            <p><strong>Shipping Price:</strong> $${Number(orderState.shippingPrice).toFixed(2)}</p>
            <p><strong>Total Order Price:</strong> $${Number(orderState.totalPrice).toFixed(2)}</p>

            <h3>Payment Details</h3>
            <p><strong>Payment Method:</strong> ${orderState.paymentMethod}</p>

            <h3>Shipping Address</h3>
            <p><strong>Name:</strong> ${userInfo.name}</p>
            <p><strong>Address:</strong> ${orderState.shippingAddress.address}</p>
            <p><strong>City:</strong> ${orderState.shippingAddress.city}</p>
            <p><strong>Postal Code:</strong> ${orderState.shippingAddress.postalCode}</p>
            <p><strong>Country:</strong> ${orderState.shippingAddress.country}</p>

            <p style="text-align: center; margin-top: 30px; color: #888;">Thank you for shopping with us!</p>
          </div>
        `,
            };
    }
  } catch (error) {
    console.error('Error sending paid invoice email:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send paid invoice email' });
  }
});

export {
  sendOrderInfoEmail,
  sendOrderConfirmationEmail,
  sendWelcomeEmail,
  sendPaidInvoiceEmail,
};
