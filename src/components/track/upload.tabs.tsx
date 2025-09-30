'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Step1 from './step1/step1';
import Step2 from './step2/step2';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ITrackUpload {
  trackName: string;
  percent: number;
  uploadedTrackName: string;
}
const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const UploadTabs = () => {
  const [value, setValue] = useState(0);
  const [trackUpload, setTrackUpload] = useState<ITrackUpload>({
    trackName: '',
    percent: 0,
    uploadedTrackName: '',
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Tracks" disabled={value !== 0} />
          <Tab label="Basic info" disabled={value === 0} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Step1 setTabIndex={setValue} setTrackUpload={setTrackUpload} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Step2 trackUpload={trackUpload} setTabIndex={setValue} />
      </CustomTabPanel>
    </>
  );
};

export default UploadTabs;
