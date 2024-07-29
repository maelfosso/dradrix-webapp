import { useMutation } from "@tanstack/react-query";
import { uploadFilesMutation } from "api/data";
import { Field, Label } from "components/common/Fieldset";
import { ActivityField, ActivityFieldUpload } from "models/monitoring";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AddDataUploadFieldProps {
  field: ActivityField;
}
export const AddDataUploadField = ({
  field
}: AddDataUploadFieldProps) => {
  const { organizationId, activityId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const { mutateAsync: mutateUploadFiles } = useMutation(
    uploadFilesMutation(organizationId!, activityId!)
  )

  useEffect(() => {
    if (selectedFiles) {
      submitSelectedFiles();
    }
  }, [selectedFiles]);

  const handleSelectedFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files); 
  }

  const submitSelectedFiles = async () => {
    if (!selectedFiles) return;

    const files = Array.from(selectedFiles);

    const formData = new FormData();
    for (let i=0; i < files.length; i++) {
      formData.append('uploadedFiles[]', files[i]);
    }

    try {
      mutateUploadFiles(formData);
    } catch (error) {
      console.error('mutate-upload-files', error);
    }
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
        {/* <div className="row my-3">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" multiple onChange={handleSelectedFiles} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!selectedFiles}
              onClick={uploadFiles}
            >
              Upload
            </button>
          </div>
        </div> */}
      </Field>
      {/* {files && Array.from(files).map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))} */}
      {selectedFiles && Array.from(selectedFiles).map((file, index) => (
        <img key={index} src={file.name} alt={`Uploaded content ${file.name}`} />
      ))}
    </div>
  )
}