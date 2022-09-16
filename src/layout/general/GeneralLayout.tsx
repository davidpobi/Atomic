import GeneralNavBar from "./GeneralNavbar";
import GeneralLayoutContainer from "../../components/GeneralLayoutContainer";

const GeneralLayout = ({ children }: any) => {
  return (
    <>
      <GeneralNavBar />
      <GeneralLayoutContainer>{children}</GeneralLayoutContainer>
    </>
  );
};

export default GeneralLayout;
