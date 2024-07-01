// pages/api/coze/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('https://api.coze.com/open_api/v2/chat', {
      conversation_id: "123",
      bot_id: process.env.BOT_ID,
      user: "123333333",
      query: req.body.query,
      stream: false,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'api.coze.com',
        'Connection': 'keep-alive'
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error making request', error: error.message });
  }
}