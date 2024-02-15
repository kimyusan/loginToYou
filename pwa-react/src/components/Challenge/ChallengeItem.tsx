import { useState } from "react";

import { challengeInfo } from "../../routes/Challenge";

import { ChallengeBox } from "../../styles/Challenge/Challenge";

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useTheme } from "styled-components";

interface challengeProps {
  key: number;
  challenge: challengeInfo;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} style={{ backgroundColor: theme.color.sub3}} className="progress"/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color={theme.color.point}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ChallengeItem = ({ challenge }: challengeProps) => {
  const [progress, setProgress] = useState(Math.round((challenge.progress/challenge.goal)*100) > 100 ? 100 : Math.round((challenge.progress/challenge.goal)*100))
  return (
    <>
      <ChallengeBox>
        <div className="item">
          <div className="subject">{challenge.subject}</div>
          <div className="content">{challenge.content}</div>
          <LinearProgressWithLabel value={progress}></LinearProgressWithLabel>
        </div>
      </ChallengeBox>
    </>
  );
};

export default ChallengeItem;
