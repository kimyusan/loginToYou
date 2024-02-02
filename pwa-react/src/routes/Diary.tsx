import PictureBox from "../components/Diary/PictureBox";
import TokenCheker from "../util/TokenCheker";

const Diary = () => {
  return (
    <div>
      <TokenCheker />
      <PictureBox></PictureBox>
    </div>
  );
};

export default Diary;
