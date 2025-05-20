import TitleBar from "~/components/layout/TitleBar";
import LogsViewer from "~/components/monitoring/LogsViewer";
import PodMetricViewer from "~/components/monitoring/PodMetricViewer";
import PanelElderly from "~/components/panelElderly/PanelElderly";


export default function Index() {
  return (
    <div className="flex flex-col h-screen">
      <TitleBar />

      <div className="flex flex-col gap-x-8">
        <PanelElderly userId="elderly_1234" />

        <LogsViewer />
      </div>
    </div>
  );
}
