'use client';

import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import './theme.css';

const InputFileUpload = () => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      onClick={(e) => e.preventDefault()}
    >
      Upload files
    </Button>
  );
};

const Step1 = () => {
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    console.log('Check accepted files: ', acceptedFiles);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Step1;
