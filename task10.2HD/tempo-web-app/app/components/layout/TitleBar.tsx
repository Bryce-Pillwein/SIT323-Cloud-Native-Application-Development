// Title Bar

import IconLogo from "../icons/IconLogo";

const TitleBar = () => {

  return (
    <div className="bg-hsl13">
      <div className="app-container flex items-center justify-between px-8 py-3 ">

        <div className="flex items-center gap-2">
          <IconLogo className="h-[24px] w-auto" />
          <p className="text-hsl80 font-drukWide">TempoTrack Vital</p>
        </div>

      </div>
    </div>
  );
};

export default TitleBar;