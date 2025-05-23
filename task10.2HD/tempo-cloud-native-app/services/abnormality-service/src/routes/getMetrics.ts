import { Router, RequestHandler } from "express";

const router = Router();

const getMetrics: RequestHandler = async (_req, res) => {
  try {
    const mem = process.memoryUsage();
    const cpu = process.cpuUsage();
    const uptime = process.uptime();

    res.status(200).json({
      service: 'abnormality-service',
      uptime: `${uptime.toFixed(2)} seconds`,
      memory: {
        rss: mem.rss,
        heapUsed: mem.heapUsed,
        heapTotal: mem.heapTotal,
      },
      cpu: {
        user: cpu.user,
        system: cpu.system,
      },
    });
  } catch (err: any) {
    console.error("Error fetching metrics:", err);
    res.status(500).json({ message: "Failed to collect metrics" });
  }
};

router.get("/metrics", getMetrics);

export default router;
