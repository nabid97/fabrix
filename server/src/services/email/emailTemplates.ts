/**
 * Email template loading utility
 */

// Template types
type TemplateType = 'orderConfirmation' | 'shippingConfirmation' | 'contactForm';

/**
 * Load email template HTML
 * @param templateName - Name of the template to load
 * @returns Template HTML as string
 */
export const loadEmailTemplate = (templateName: TemplateType): string => {
  // In a production environment, these would be loaded from actual HTML files
  // For simplicity, we're defining them inline here
  switch (templateName) {
    case 'orderConfirmation':
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background-color: #f3f4f6; padding: 10px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    .summary { background-color: #f9fafb; padding: 15px; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Order!</h1>
    </div>
    <div class="content">
      <p>Dear {{customerName}},</p>
      <p>Thank you for your order with FabriX. We are pleased to confirm that we've received your order.</p>
      
      <h2>Order Details</h2>
      <p><strong>Order Number:</strong> {{orderNumber}}</p>
      <p><strong>Order Date:</strong> {{orderDate}}</p>
      
      <h3>Items Ordered</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th style="text-align: center;">Quantity</th>
            <th style="text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          {{items}}
        </tbody>
      </table>
      
      <div class="summary">
        <h3>Order Summary</h3>
        <table>
          <tr>
            <td>Subtotal:</td>
            <td style="text-align: right;">{{subtotal}}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td style="text-align: right;">{{shipping}}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td style="text-align: right;">{{tax}}</td>
          </tr>
          <tr>
            <td><strong>Total:</strong></td>
            <td style="text-align: right;"><strong>{{total}}</strong></td>
          </tr>
        </table>
      </div>
      
      <h3>Shipping Information</h3>
      <p><strong>Address:</strong> {{shippingAddress}}</p>
      <p><strong>Shipping Method:</strong> {{shippingMethod}}</p>
      
      <p>You will receive another email when your order ships with tracking information.</p>
      
      <p>If you have any questions about your order, please contact our customer service team at support@fabrix.com or call us at +1 (555) 123-4567.</p>
      
      <p>Thank you for shopping with FabriX!</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FabriX. All rights reserved.</p>
      <p>123 Fabric Street, Suite 100<br>Textile City, TX 75001</p>
    </div>
  </div>
</body>
</html>
      `;
    
    case 'shippingConfirmation':
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipping Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0d9488; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
    .tracking-box { background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .button { display: inline-block; background-color: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Order Has Shipped!</h1>
    </div>
    <div class="content">
      <p>Dear {{customerName}},</p>
      <p>Great news! Your FabriX order #{{orderNumber}} has been shipped and is on its way to you.</p>
      
      <div class="tracking-box">
        <h3>Tracking Information</h3>
        <p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
        <p><strong>Estimated Delivery:</strong> {{estimatedDelivery}}</p>
        <p><a href="https://fabrix.com/track/{{trackingNumber}}" class="button">Track Your Package</a></p>
      </div>
      
      <p>If you have any questions about your shipment, please contact our customer service team at support@fabrix.com or call us at +1 (555) 123-4567.</p>
      
      <p>Thank you for shopping with FabriX!</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FabriX. All rights reserved.</p>
      <p>123 Fabric Street, Suite 100<br>Textile City, TX 75001</p>
    </div>
  </div>
</body>
</html>
      `;
    
    case 'contactForm':
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
    .message-box { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>We've Received Your Message</h1>
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>Thank you for contacting FabriX. This email confirms that we've received your message on {{date}}.</p>
      
      <div class="message-box">
        <h3>Your Message</h3>
        <p><strong>Subject:</strong> {{subject}}</p>
        <p><strong>Message:</strong></p>
        <p>{{message}}</p>
      </div>
      
      <p>Our team will review your message and get back to you as soon as possible, usually within 1-2 business days.</p>
      
      <p>If you have any urgent questions, please call us at +1 (555) 123-4567.</p>
      
      <p>Best regards,<br>The FabriX Team</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FabriX. All rights reserved.</p>
      <p>123 Fabric Street, Suite 100<br>Textile City, TX 75001</p>
    </div>
  </div>
</body>
</html>
      `;
    
    default:
      throw new Error(`Template '${templateName}' not found`);
  }
};