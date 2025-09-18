const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validate the input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please fill in all fields' }),
      };
    }

    // Use Netlify's environment variables to store your email
    const toEmail = process.env.MY_EMAIL;
    const subject = `New Contact Form Submission from ${name}`;
    const body = `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;

    // Send the email using Netlify's built-in email service
    const response = await fetch('https://api.netlify.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETLIFY_API_TOKEN}`
      },
      body: JSON.stringify({
        to: toEmail,
        from: 'portfolio-form@yourdomain.com', // Replace with your domain
        subject: subject,
        text: body
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' })
    };
  }
};
