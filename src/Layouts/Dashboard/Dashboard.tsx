// Styles
// import VideoPlayer from "../../components/VideoPlayer/VideoPlayer"
// import { useGlobal } from "../../contexts/UserContext"
import { ComponentWrap, MenuWrap } from "./styled";

// types
import { IHome } from "./type";

const Home = ({ menu, children }: IHome) => {
  // const { company } = useGlobal()

  return (
    <ComponentWrap as="main">
      <MenuWrap as="header">{menu}</MenuWrap>
      {children}

      {/* company && <VideoPlayer /> */}
    </ComponentWrap>
  );
};

export default Home;
