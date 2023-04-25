import React, { useState } from "react";

import { api } from "../../services/api";
//import Dropzone from "react-dropzone";

const Upload = ( props ) => {
    
    const fetchData  = props.fetch_data
    const [file, setFile] = useState({})


    const handleUpload = (e) => {
        const upload = e.target.files[0]
        setFile({...file, upload: upload})

    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const uploadFile = async () => {
            const formData = new FormData()
//            formData.append(file.upload.name, file.upload, file.upload.name)
            formData.append("uploaded_file", file.upload)

            const headers = { headers: {
                      'Content-Type': 'multipart/form-data'
                }
            }
        
            const response = await api.post("/files/pdf", formData, headers)
            console.log(response.data)
            fetchData()
        }

        uploadFile()
    }

    return (
        <form className="upload" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="file">Escolha o arquivo para fazer upload:</label>
                <input type="file" id="file" name="file" accept=".pdf"
                 onChange={ handleUpload }/>
        </div>
        <div>
            <button>Submit</button>
        </div>
        </form>
        )


}

export default Upload