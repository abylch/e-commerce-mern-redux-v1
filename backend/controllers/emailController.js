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
      subject: 'Inquire Information Product/s, Payment...',
      text: `Thank you, ${user.name}, for your Inquire! Here are the details: ${JSON.stringify(cartState)}`,
      html: `
      <p> this is a test, is not a real order inquire </p>
      <p>Thank you, ${user.name}, for your Inquire Information Product/s, Payment...!</p>
      <p>We'll get back to you, ASAP!</p>
      <p>Here are the details:</p>
      <p>Order ID: ${cartState.orderId}</p>
      <p>Products:</p>
      <table border="1">
    <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${cartState.cartItems.map((item, index) => (
        `<tr key=${index}>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.price}</td>
          <td>${item.qty * item.price}</td>
        </tr>`
      )).join('')}
    </tbody>
  </table>
      <p>Items Price: ${cartState.itemsPrice}</p>
      <p>Shipping Address:</p>
      <p>Address: ${cartState.shippingAddress.address}</p>
      <p>City: ${cartState.shippingAddress.city}</p>
      <p>Postal Code: ${cartState.shippingAddress.postalCode}</p>
      <p>Country: ${cartState.shippingAddress.country}</p>
      <p>Payment Method: ${cartState.paymentMethod}</p>
      <p>Order Status: ${cartState.orderStatus}</p>
      <p>Order Date: ${cartState.orderDate}</p>
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
      // cc: 'exintraders@bylch.com',
      subject: `Order ${orderState._id} confirmation Status`,
      text: `Thank you, ${user.name}, for making an Order! Here are the details: ${JSON.stringify(orderState)}`,
      html: `
      <p> this is a test, is not a real order confirmation </p>
      <p>Thank you, ${user.name}, for making an Order!</p>
      <p>Here are the details:</p>
      <p>Order ID: ${orderState._id}</p>
      <p>Order Status is Paid: ${orderState.isPaid}</p>
      <p>Products:</p>
      <table border="1">
    <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${orderState.orderItems.map((item, index) => (
        `<tr key=${index}>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.price}</td>
          <td>${item.qty * item.price}</td>
        </tr>`
      )).join('')}
    </tbody>
  </table>
      <p>Total Items Price: ${orderState.itemsPrice}</p>
      <p>Total Shipping Price: ${orderState.shippingPrice}</p>
      <p>Total Order Price: ${orderState.totalPrice}</p>
      <p>Payment Method: ${orderState.paymentMethod}</p>
      <p>Order Status is Paid: ${orderState.isPaid}</p>
      <p>Order Date: ${orderState.updatedAt}</p>
      <p>Shipping Address:</p>
      <p>Address: ${orderState.shippingAddress.address}</p>
      <p>City: ${orderState.shippingAddress.city}</p>
      <p>Postal Code: ${orderState.shippingAddress.postalCode}</p>
      <p>Country: ${orderState.shippingAddress.country}</p>
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
    res.status(200).json({ success: true, messageId: info.messageId });

    // Placeholder function for building the paid invoice email content
    function buildPaidInvoiceEmailContent(orderState, userInfo) {
      return {
        from: '"Your e-Shop-Shop" <exintraders@bylch.com>',
        to: userInfo.email,
        subject: `Paid Invoice for Order ${orderState._id}`,
        text: `Thank you for your payment. Here is your paid invoice: ${JSON.stringify(orderState)}`,
        html: `
          <p>This is a test, not a real paid invoice.</p>
          <p>Dear ${userInfo.name},</p>
          <p>Thank you for your payment! Below is the paid invoice for your order:</p>
          <p>Order ID: ${orderState._id}</p>
          <p>Order Status is Paid: ${orderState.isPaid}</p>
          <p>Products:</p>
          <table border="1">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderState.orderItems.map((item, index) => (
                `<tr key=${index}>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td>${item.price}</td>
                  <td>${item.qty * item.price}</td>
                </tr>`
              )).join('')}
            </tbody>
          </table>
          <p>Total Items Price: ${orderState.itemsPrice}</p>
          <p>Total Shipping Price: ${orderState.shippingPrice}</p>
          <p>Total Order Price: ${orderState.totalPrice}</p>
          <p>Payment Method: ${orderState.paymentMethod}</p>
          <p>Order Date: ${orderState.updatedAt}</p>
          <p>Shipping Address:</p>
          <p>Address: ${orderState.shippingAddress.address}</p>
          <p>City: ${orderState.shippingAddress.city}</p>
          <p>Postal Code: ${orderState.shippingAddress.postalCode}</p>
          <p>Country: ${orderState.shippingAddress.country}</p>
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
