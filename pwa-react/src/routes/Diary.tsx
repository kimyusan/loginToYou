import PictureBox from "../components/Diary/PictureBox";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";
import { useTheme } from "styled-components";

const Diary = () => {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.color.bgColor }}>
      <TokenCheker />
      <MenuSection />
      <PictureBox></PictureBox>
    </div>
  );
};

export default Diary;
