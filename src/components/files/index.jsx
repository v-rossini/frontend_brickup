import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import ItemList from "../items";
import Upload from "../upload";

const FileList = () => {
    const { authenticated  } = useContext(AuthContext)
    const [files, setFiles] = useState( null )
    const [currentFile, setCurrentFile] = useState( null )
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        const response = await api.get("/files")
        setFiles(response.data.reverse())
        setLoading(false)

    }
    
    useEffect(() => {
        
        
        if (authenticated && !files) {   
            fetchData()

        }
    }, [])

    const handleChange = (id) =>{
        setCurrentFile(id);
      };
    



    if(loading)
          return (<div className="loading">carregando arquivos...</div>)

    return(
        <div>
            <Upload fetch_data = {fetchData} />
            <h2>Arquivos enviados:</h2>
            <select onChange={(e) => handleChange(e.target.value)}>
               { files.map((f) => (
                <option value={f.id} key={f.id}>
                    {f.id}  -  {f.filename}      
                </option>
               ) ) }
            </select>
            
            {currentFile && <ItemList file_id={currentFile}/>}
            
        </div>)
}

export default FileList