import { ExclamationCircleIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { uploadFilesMutation } from "api/data";
import { Button } from "components/common/Button";
import { Field, Label } from "components/common/Fieldset";
import { ActivityField, ActivityFieldUpload } from "models/monitoring";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "utils/css";

interface AddDataUploadFieldProps {
  field: ActivityField;
  fieldValues: string[];
  onUpdateField: (fieldId: string, values: any) => void;
}
export const AddDataUploadField = ({
  field,
  fieldValues,
  onUpdateField,
}: AddDataUploadFieldProps) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (fieldValues && !Array.isArray(fieldValues)) {
      onUpdateField(field.id, []);
    }
  }, []);

  const handleSelectedFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const acceptedFiles = Array.from(event.target.files);
    const filesToAdd = acceptedFiles.filter(
      (acceptedFileItem) => !files.find((file: File) =>
        (file.name === acceptedFileItem.name
          && file.lastModified === acceptedFileItem.lastModified)
      )
    )
    
    setFiles([...files, ...filesToAdd]);
  }

  return (
    <div>
      <Field key={`add-data-field-${field.id}`}>
        <Label>{field.name}</Label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input id="file-upload" multiple={(field.details as ActivityFieldUpload).maxNumberOfItems > 1}
                  name="file-upload" type="file" className="sr-only"
                  onChange={handleSelectedFiles}
                />
              </label>
            </div>
            <p className="text-xs leading-5 text-gray-600">PDF, WORD, PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </Field>
      {files.length > 0 && files.map((file) => (
        <UploadFileItem
          key={`${file.lastModified}-${file.name}`}
          file={file}
          fieldId={field.id}
          fieldValues={fieldValues}
          onUpdateField={onUpdateField}
        />
      ))}
    </div>
  )
}

interface UploadFileItemProps {
  file: File;
  fieldId: string;
  fieldValues: string[];
  onUpdateField: (fieldId: string, values: any) => void;
}
const UploadFileItem = ({
  file,
  fieldId,
  fieldValues,
  onUpdateField
}: UploadFileItemProps) => {
  const { organizationId, activityId } = useParams();
  const [uploadError, setUploadError] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadProgress = (progressEvent: ProgressEvent) => {
    const progress =  Math.round((progressEvent.loaded / progressEvent.total) * 100);
    setProgress(progress);
  }

  const { mutateAsync: mutateUploadFiles } = useMutation(
    uploadFilesMutation(organizationId!, activityId!, uploadProgress)
  )

  useEffect(() => {
    uploadToServer(file);
  }, [])

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("uploaded-file", file)
    setUploading(true);

    try {
      const response = await mutateUploadFiles(formData);
      console.log(response);
      onUpdateField(fieldId, [...fieldValues, response.fileKey ]);
    } catch (error) {
      console.error('mutate-upload-files', error);
      setUploadError((error as Error).message);
    } finally {
      setUploading(false);
    }
  }

  const handleDeleteUploadedFile = () => {

  }

  return (
    <div className="flex items-center justify-between">
      <div className={cn("grow text-base", uploadError && "text-red-600")}>{file.name}</div>
      {uploading && !uploadError && (
        <>
          <div className="text-xs">Uploading {progress}%</div>
          <div><Button plain onClick={() => handleDeleteUploadedFile()}><XCircleIcon /></Button></div>
        </>
      )}
      {uploadError && (
        <div><Button plain className="[&>[data-slot=icon]]:text-red-600"><ExclamationCircleIcon/></Button></div>
      )}
      {!uploading && !uploadError && (
        <div>
          <Button plain onClick={() => handleDeleteUploadedFile()}><TrashIcon /></Button>
        </div>
      )}
    </div>
  )
}