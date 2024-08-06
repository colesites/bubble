import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/Components/ui";
import { convertFileToUrl } from "@/lib/utils";


type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  /*const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);*/

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>(mediaUrl ? [mediaUrl] : []);


  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      fieldChange(acceptedFiles);
      const urls = acceptedFiles.map(file => convertFileToUrl(file));
      setFileUrls(urls);
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "video/mp4": [".mp4"],
      "audio/*": [".mp3"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-white rounded-xl p-8 cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrls.length > 0 ? (
        <>
          <div className="flex flex-col items-center flex-1 justify-center w-full p-5 lg:p-10">
          {fileUrls.map((url, index) => {
              const fileType = files[index].type.split("/")[0];
              return (
                <div key={index} className="mb-4 w-full">
                  {fileType === "image" ? (
                    <img src={url} alt={`file-${index}`} className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top mb-2" />
                  ) : fileType === "audio" ? (
                    <audio src={url} controls className="w-full"></audio>
                  ) : fileType === "video" ? (
                    <video src={url} controls className="w-full h-80 lg:h-[480px] mb-2" />
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="text-gray text-center text-[14px] font-normal leading-[140%] w-full p-4 border-t border-t-gray/30">Click or Drag media to replace</p>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-[612px];">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="media upload"
          />

          <h3 className="text-[16px] font-medium leading-[140%]; text-gray mb-2 mt-6">
            Drag or Add media here
          </h3>
          <p className="text-gray text-[14px] font-normal leading-[140%] mb-6">Video, Audio, Image</p>

          <Button type="button" className="bg-purple-one">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;