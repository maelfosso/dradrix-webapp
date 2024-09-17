import { Field, Label } from "@/components/common/Fieldset";
import { ActivityField, ActivityFieldUpload } from "models/monitoring";
import { useEffect, useState } from "react";
import UploadFileItem from "./UploadFileItem";

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
  const [files, setFiles] = useState<{
    file: File,
    fileKey: string
  }[]>([])

  useEffect(() => {
    if (!fieldValues || (fieldValues && !Array.isArray(fieldValues))) {
      onUpdateField(field.id, []);
    }
  }, []);

  const handleSelectedFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const acceptedFiles = Array.from(event.target.files);
    const filesToAdd = acceptedFiles.filter(
      (acceptedFileItem) => !files.find(f =>
        (f.file.name === acceptedFileItem.name
          && f.file.lastModified === acceptedFileItem.lastModified)
      )
    ).map(f => ({ file: f, fileKey: "" }))
    
    setFiles([...files, ...filesToAdd]);
  }

  const handleUploadedFile = (file: File, fileKey: string) => {
    setFiles(
      files.map(f => {
        if (f.file.name === file.name) {
          return {
            ...f,
            fileKey
          }
        }

        return f;
      })
    )
    onUpdateField(field.id, [...fieldValues, fileKey ]);
  }

  const handleRemoveFile = (fileItem: {file: File, fileKey: string}) => {
    onUpdateField(field.id, fieldValues.filter(v => v !== fileItem.fileKey));
    setFiles(files.filter(f => f.file.name !== fileItem.file.name));
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
          key={`${file.file.lastModified}-${file.file.name}`}
          file={file.file}
          fileKey={file.fileKey}
          onUploadedFile={handleUploadedFile}
          onRemoveFile={handleRemoveFile}
        />
      ))}
    </div>
  )
}
