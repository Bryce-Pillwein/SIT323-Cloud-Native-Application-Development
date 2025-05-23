import TitleBar from "~/components/layout/TitleBar";
import LogsViewer from "~/components/monitoring/LogsViewer";
import PodMetricViewer from "~/components/monitoring/PodMetricViewer";
import ServiceStatusCard from "~/components/monitoring/ServiceStatusCard";
import PanelElderly from "~/components/panelElderly/PanelElderly";
import { useMonitoring } from "~/providers/MonitoringProvider";


export default function Index() {
  const { services, timestamp } = useMonitoring();


  return (
    <div className="flex flex-col h-screen">
      <TitleBar />

      {/* <div className="flex flex-col gap-x-8">
        <PanelElderly userId="elderly_1234" />

        <LogsViewer />
      </div> */}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Service Monitoring</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: {timestamp ? new Date(timestamp).toLocaleString() : "unknown"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map(service => (
            <ServiceStatusCard key={service.name} service={service} />
          ))}
        </div>
      </div>


    </div>
  );
}
