import SiteHeader from "../components/SiteHeader";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
};

export default DefaultLayout;
