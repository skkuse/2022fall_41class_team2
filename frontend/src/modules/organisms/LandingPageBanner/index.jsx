import SettingsButton from "../../molecules/SettingsButton";

const LandingPageBanner = ({ className, ...restProps }) => {
  return (
    <div className={`${className} common-landing-page-banner`} {...restProps}>
      <SettingsButton />
    </div>
  );
}

export default LandingPageBanner;