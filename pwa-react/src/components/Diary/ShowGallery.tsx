import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DiaryBox from './DiaryBox';
import Card from '@mui/material/Card';
import { Gallery } from '../../styles/Diary/DiaryBox';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: "20px" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{width: "100%"}}>
          <Tab label="다이어리" {...a11yProps(0)} sx={{width:"50%"}}/>
          <Tab label="사진" {...a11yProps(1)} sx={{width:"50%"}}/>
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <DiaryBox></DiaryBox>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Gallery>
          {a.map((item, idx) => (
            <Card className='item' key={idx}>

            </Card>
          ))}
        </Gallery>
      </CustomTabPanel>
    </Box>
  );
}