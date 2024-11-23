/* eslint-disable @next/next/no-img-element */
import LogoImage from "../../../public/images/genesyslogo.png";
const LogoHeader = () => {
  return (
    <img
      src={LogoImage.src} // Path relative to the `public` directory
      alt="A description of the image"
      width={200} // Desired width in pixels
      height={60} // Desired height in pixels
    />
  );
};

export default LogoHeader;
