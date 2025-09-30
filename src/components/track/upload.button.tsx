'use client';

import styled from '@emotion/styled';
import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';

interface IProps {
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadButton = (props: IProps) => {
  const { onClick, onChange } = props;

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      onClick={onClick}
      onChange={onChange}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
      />
    </Button>
  );
};

export default UploadButton;
