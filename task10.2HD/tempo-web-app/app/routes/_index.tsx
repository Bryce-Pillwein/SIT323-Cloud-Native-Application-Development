import TitleBar from "~/components/layout/TitleBar";
import PanelElderly from "~/components/panelElderly/PanelElderly";


export default function Index() {
  return (
    <div className="flex flex-col h-screen">
      <TitleBar />

      <PanelElderly userId="elderly_1234" />

    </div>
  );
}
