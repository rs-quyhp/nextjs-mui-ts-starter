'use client';

import { FileWithPath, useDropzone } from 'react-dropzone';
import './theme.css';
import InputFileUpload from '../upload.button';

interface IProps {
  setTabIndex: (i: number) => void;
}

const Step1 = (props: IProps) => {
  const { setTabIndex } = props;

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    setTabIndex(1);
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
        <InputFileUpload onClick={(e) => e.preventDefault()} />
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
