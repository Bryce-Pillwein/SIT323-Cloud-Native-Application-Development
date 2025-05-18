// Title Bar

import { useBackendStatus } from "~/providers/BackendStatusProvider";
import IconLogo from "../icons/IconLogo";

const TitleBar = () => {

  const { status, refresh } = useBackendStatus();


  return (
    <div className="bg-hsl13">
      <div className="app-container flex items-center justify-between px-8 py-3 ">

        <div className="flex items-center gap-2">
          <IconLogo className="h-[24px] w-auto" />
          <p className="text-hsl80 font-drukWide">TempoTrack Vital</p>
        </div>

        <div className="flex items-center gap-x-4">
          <p className="text-hsl80 text-sm">Backend Status:</p>
          <p className={`text-sm font-bold ${status === "up" ?
            "text-green-600" :
            status === "down" ? "text-red-600"
              : "text-gray-600"}`}>
            {status.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;