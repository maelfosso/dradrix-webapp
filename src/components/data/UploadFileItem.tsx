import { ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { deleteUploadedFileMutation, uploadFilesMutation } from "api/data";
import { Button } from "components/common/Button";
import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "lib/utils";

interface UploadFileItemProps {
  file: File;
  fileKey: string;
  onUploadedFile: (file: File, fileKey: string) => void;
  onRemoveFile: (fileItem: {file: File, fileKey: string}) => void;
}
const UploadFileItem = ({
  file,
  fileKey,
  onUploadedFile,
  onRemoveFile
}: UploadFileItemProps) => {
  const mounted = useRef(true);

  const { organizationId, activityId } = useParams();
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const uploadProgress = (progressEvent: ProgressEvent) => {
    const progress =  Math.round((progressEvent.loaded / progressEvent.total) * 100);
    setProgress(progress);
  }

  const { mutateAsync: mutateUploadFiles } = useMutation(
    uploadFilesMutation(organizationId!, activityId!, uploadProgress)
  )
  const { mutateAsync: mutateDeleteUploadedFile } = useMutation(
    deleteUploadedFileMutation(organizationId!, activityId!)
  )

  useEffect(() => {
    mounted.current && uploadToServer(file);

    return () => {
      mounted.current = false;
    }
  }, [file])

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("uploaded-file", file)
    setUploading(true);

    try {
      const response = await mutateUploadFiles(formData);
      onUploadedFile(file, response.fileKey);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setUploading(false);
    }
  }

  const handleDeleteUploadedFile = async () => {
    try {
      setDeleting(true);
      if (fileKey) {
        const response = await mutateDeleteUploadedFile({ fileKey });
        console.log(response);
      }
      onRemoveFile({ file, fileKey });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className={cn("grow text-base", error && "text-red-600")}>{file.name}</div>
      {uploading && (
        <div className="text-xs">Uploading {progress}%</div>
      )}
      {error && (
        <div><Button plain className="[&>[data-slot=icon]]:text-red-600"><ExclamationCircleIcon /></Button></div>
      )}
      {!uploading && (
        <div>
          <Button plain onClick={() => handleDeleteUploadedFile()}>
            <TrashIcon className={cn(deleting && 'animate-spin')} />
          </Button>
        </div>
      )}
    </div>
  )
}

export default memo(UploadFileItem)