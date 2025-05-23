// Icon Logo tsx

interface IconLogoProps {
  className?: string;
  size?: number;
}

const IconLogo = ({ className = "", size = 50 }: IconLogoProps) => {

  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
    >
      <path stroke="#0faebd" strokeWidth="1.5" strokeLinecap="round"
        d="M7.52879 16.4712C2.59014 11.5325 0.588351 5.52715 3.05768 3.05782C5.04852 1.06697 9.33779 1.98237 13.5134 5M16.471 7.52894C21.4097 12.4676 23.4115 18.473 20.9421 20.9423C18.9535 22.931 14.6713 22.0198 10.5 19.01M20.9423 3.05768C23.4117 5.52701 21.4099 11.5324 16.4712 16.4711C11.5326 21.4097 5.5272 23.4115 3.05787 20.9422C1.06704 18.9513 1.98242 14.6621 5 10.4865C5.72528 9.48285 6.57199 8.4858 7.52899 7.5288C12.4676 2.59014 18.473 0.588345 20.9423 3.05768Z" >
      </path>
      <path stroke="#0faebd" strokeWidth="1.5"
        d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z">
      </path>
    </svg>
  );
}

export default IconLogo;