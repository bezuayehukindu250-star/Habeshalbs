
import { Order } from '../types';

export const telegramService = {
  sendOrderNotification: async (order: Order) => {
    // In a real production app, you would use a Telegram Bot Token.
    // For this demo, we simulate sending the message to @jaksen27.
    
    const message = `
🌟 *New Order Received!* 🌟
-------------------------
👗 *Product:* ${order.productName}
📏 *Size:* ${order.size}
🎨 *Color:* ${order.color}

👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.phone}
📍 *Address:* ${order.address}
-------------------------
Processed at: ${new Date(order.createdAt).toLocaleString()}
    `;

    console.log('--- TELEGRAM NOTIFICATION TO @jaksen27 ---');
    console.log(message);
    
    // Example of how to call the real API (requires bot token):
    /*
    const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
    const CHAT_ID = 'YOUR_CHAT_ID_HERE'; // The ID for @jaksen27
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    } catch (e) {
      console.error('Telegram API Error:', e);
    }
    */
    
    return true; // Simulate success
  }
};
