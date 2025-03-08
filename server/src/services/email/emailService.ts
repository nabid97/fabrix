import nodemailer from 'nodemailer';
import { IOrder } from '../../models/Order';
import config from '../../config';
import { loadEmailTemplate } from './emailTemplates';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465, // true for 465, false for other ports
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

/**
 * Send order confirmation email to customer
 * @param order - Order details
 * @param email - Customer email
 */
export const sendOrderConfirmationEmail = async (order: IOrder, email: string): Promise<void> => {
  try {
    // Load template and replace placeholders
    const template = loadEmailTemplate('orderConfirmation');
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    
    // Calculate order summary
    const subtotal = order.payment.subtotal.toFixed(2);
    const shipping = order.payment.shipping.toFixed(2);
    const tax = order.payment.tax.toFixed(2);
    const total = order.payment.total.toFixed(2);
    
    // Generate items HTML
    const itemsHtml = order.items.map(item => `
      <tr>
        <td style="padding: 10px;">${item.name}</td>
        <td style="padding: 10px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');
    
    // Replace placeholders in template
    const html = template
      .replace('{{orderNumber}}', order.orderNumber)
      .replace('{{orderDate}}', orderDate)
      .replace('{{customerName}}', `${order.customer.firstName} ${order.customer.lastName}`)
      .replace('{{items}}', itemsHtml)
      .replace('{{subtotal}}', `$${subtotal}`)
      .replace('{{shipping}}', `$${shipping}`)
      .replace('{{tax}}', `$${tax}`)
      .replace('{{total}}', `$${total}`)
      .replace('{{shippingAddress}}', 
        `${order.shipping.address1}, 
         ${order.shipping.address2 ? order.shipping.address2 + ', ' : ''} 
         ${order.shipping.city}, ${order.shipping.state} ${order.shipping.zipCode}, 
         ${order.shipping.country}`
      )
      .replace('{{shippingMethod}}', order.shipping.method);
    
    // Send email
    await transporter.sendMail({
      from: `"FabriX" <${config.email.from}>`,
      to: email,
      subject: `FabriX Order Confirmation - #${order.orderNumber}`,
      html,
      text: `Thank you for your order #${order.orderNumber}! Your order has been received and is being processed.`,
    });
    
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    // Don't throw error to prevent disrupting the order process
  }
};

/**
 * Send shipping confirmation email with tracking information
 * @param order - Order details
 * @param email - Customer email
 */
export const sendShippingConfirmationEmail = async (order: IOrder, email: string): Promise<void> => {
  try {
    // Only send if tracking number is available
    if (!order.shipping.trackingNumber) {
      return;
    }
    
    // Load template and replace placeholders
    const template = loadEmailTemplate('shippingConfirmation');
    
    // Replace placeholders in template
    const html = template
      .replace('{{orderNumber}}', order.orderNumber)
      .replace('{{customerName}}', `${order.customer.firstName} ${order.customer.lastName}`)
      .replace('{{trackingNumber}}', order.shipping.trackingNumber)
      .replace('{{estimatedDelivery}}', order.shipping.estimatedDelivery || 'Not available');
    
    // Send email
    await transporter.sendMail({
      from: `"FabriX" <${config.email.from}>`,
      to: email,
      subject: `Your FabriX Order #${order.orderNumber} Has Shipped`,
      html,
      text: `Your order #${order.orderNumber} has been shipped! Tracking number: ${order.shipping.trackingNumber}`,
    });
    
    console.log(`Shipping confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending shipping confirmation email:', error);
  }
};

/**
 * Send contact form confirmation email
 * @param name - Customer name
 * @param email - Customer email
 * @param subject - Contact form subject
 * @param message - Contact form message
 */
export const sendContactFormConfirmation = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  try {
    // Load template and replace placeholders
    const template = loadEmailTemplate('contactForm');
    const date = new Date().toLocaleDateString();
    
    // Replace placeholders in template
    const html = template
      .replace('{{name}}', name)
      .replace('{{date}}', date)
      .replace('{{subject}}', subject)
      .replace('{{message}}', message);
    
    // Send confirmation to customer
    await transporter.sendMail({
      from: `"FabriX Support" <${config.email.from}>`,
      to: email,
      subject: 'We received your message',
      html,
      text: `Thank you for contacting us! We've received your message and will get back to you soon.`,
    });
    
    // Send notification to admin
    await transporter.sendMail({
      from: `"FabriX Website" <${config.email.from}>`,
      to: config.email.from,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      text: `New contact form submission from ${name} (${email}): ${message}`,
    });
    
    console.log(`Contact form confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending contact form confirmation email:', error);
    throw error;
  }
};