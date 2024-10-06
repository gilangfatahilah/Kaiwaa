import React from "react";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

type Props = {
  onChange: (urls: string[]) => void;
  type: "image" | "file";
};

const Uploader = ({ type, onChange }: Props) => {
  return (
    <UploadDropzone
      endpoint={type}
      onClientUploadComplete={(res) => onChange(res.map((item) => item.url))}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
};

export default Uploader;
