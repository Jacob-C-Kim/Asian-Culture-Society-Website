import imgTransparentLogo11 from "../assets/acs-logo-transparent.png";

interface ACSLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function ACSLogo({ 
  size = 61, 
  className = "", 
  onClick 
}: ACSLogoProps) {
  return (
    <div
      className={`bg-center bg-cover bg-no-repeat shrink-0 cursor-pointer hover:scale-105 transition-transform ${className}`}
      style={{
        backgroundImage: `url('${imgTransparentLogo11.src}')`,
        width: `${size}px`,
        height: `${size}px`
      }}
      onClick={onClick}
      data-name="ACS Logo"
    />
  );
}