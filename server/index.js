import cors from 'cors';
import crypto from 'crypto';
import express from 'express';

const app = express();
const PORT = Number.parseInt(process.env.PORT ?? '3001', 10);

app.use(cors());
app.use(express.json());

const KRAKEN_BASE_URL = 'https://api.kraken.com';
const ADD_ORDER_PATH = '/0/private/AddOrder';

const createKrakenSignature = (path, requestParams, secret) => {
  const secretBuffer = Buffer.from(secret, 'base64');
  const hashData = `${requestParams.get('nonce')}${requestParams.toString()}`;
  const hash = crypto.createHash('sha256').update(hashData).digest();
  const hmac = crypto.createHmac('sha512', secretBuffer);
  hmac.update(path, 'utf8');
  hmac.update(hash);
  return hmac.digest('base64');
};

app.post('/api/kraken/connect', async (req, res) => {
  const {
    apiKey,
    apiSecret,
    pair = 'XBTUSD',
    type = 'buy',
    ordertype = 'market',
    volume = '0.01',
    validateOnly = true
  } = req.body ?? {};

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ success: false, message: 'API key and secret are required.' });
  }

  const nonce = Date.now().toString();
  const params = new URLSearchParams({
    nonce,
    pair,
    type,
    ordertype,
    volume
  });

  if (validateOnly) {
    params.append('validate', 'true');
  }

  try {
    const signature = createKrakenSignature(ADD_ORDER_PATH, params, apiSecret);
    const response = await fetch(`${KRAKEN_BASE_URL}${ADD_ORDER_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'API-Key': apiKey,
        'API-Sign': signature
      },
      body: params.toString()
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data?.error?.join(' | ') || 'Kraken API request failed.'
      });
    }

    if (data?.error?.length) {
      return res.status(400).json({
        success: false,
        message: data.error.join(' | ')
      });
    }

    return res.json({
      success: true,
      message: validateOnly
        ? 'Credentials validated with Kraken (no order executed).'
        : 'Order accepted by Kraken.',
      result: data?.result ?? null
    });
  } catch (error) {
    console.error('[kraken-connect] error', error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected error while contacting Kraken.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Kraken proxy listening on http://localhost:${PORT}`);
});
