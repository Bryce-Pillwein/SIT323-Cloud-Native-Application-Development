import fetch from 'node-fetch';

interface Alert {
  userId: string;
  reason: string;
  vitals: any;
  triggeredAt: string;
}

export async function sendAlert(alert: Alert) {
  const alertServiceUrl = process.env.ALERT_SERVICE_URL || 'http://alert-service:3003/v1/alert';

  try {
    const res = await fetch(alertServiceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });

    if (!res.ok) {
      console.error(`Alert service responded with status ${res.status}`);
    } else {
      console.log(`Alert sent for ${alert.userId}`);
    }
  } catch (err) {
    console.error('Failed to send alert:', err);
  }
}
