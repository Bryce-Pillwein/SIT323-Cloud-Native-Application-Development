import mqtt from 'mqtt';

const brokerUrl = "mqtt://broker.hivemq.com:1883";
const topic = 'tempotrackvital0192837465/health/new';
const client = mqtt.connect(brokerUrl);

export function publishHealthData(topic: string, data: any) {
  const payload = JSON.stringify(data);

  client.publish(topic, payload, {}, (err) => {
    if (err) {
      console.error('❌ Failed to publish MQTT message:', err);
    } else {
      console.log(`📤 MQTT Published to ${topic}`);
    }
  });
}
