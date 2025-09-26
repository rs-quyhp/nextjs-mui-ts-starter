'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import InputFileUpload from '../upload.button';
import { ITrackUpload } from '../upload.tabs';
import './theme.css';

interface IProps {
  setTabIndex: (i: number) => void;
  setTrackUpload: (value: any) => void;
}

const Step1 = (props: IProps) => {
  const { setTabIndex, setTrackUpload } = props;
  const { data: session } = useSession();

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        setTabIndex(1);

        const file = acceptedFiles[0];
        const trackUpload: ITrackUpload = {
          trackName: file.name,
          percent: 0,
        };
        const formData = new FormData();
        formData.append('fileUpload', file);
        console.log('Check files: ', file);
        console.log('Check client session: ', session);

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/files/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
                target_type: 'tracks',
                delay: 1000,
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent?.total) {
                  let percentCompleted = Math.floor(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setTrackUpload({ ...trackUpload, percent: percentCompleted });
                  console.log('Check progress: ', percentCompleted);
                }
              },
            }
          );

          console.log('Check res: ', res);
        } catch (error) {
          //@ts-ignore
          alert(error?.response?.data?.message);
        }
      }
    },
    [session]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: ['audio/*'],
    },
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
