import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import "./styles.css"



const ItemList = (props) => {
    const  file_id  = props.file_id

    const { authenticated  } = useContext(AuthContext)
    const [items, setItems] = useState( null )
    const [filters, setFilters] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/files/${file_id}/items`)
            setItems(response.data)
            setLoading(false)
        }

        if (authenticated && !items) {   
            fetchData()
        }
    }, [])

    const handleFilter = (e) => {
        e.preventDefault()

        const queryData = filters
        Object.keys(queryData).forEach( e => {
            if( !(queryData[e].length > 0) )
                delete queryData[e]
        })
  

        const fetchFilteredData = async () => {    
            
            const response = await api.get(`/files/${file_id}/items`, {params: queryData})
            console.log(response.data)
            setItems(response.data)
        }


        fetchFilteredData()
    }




    if(loading)
          return (<div className="loading">carregando itens...</div>)

    return(
        <div>
            <h4>filtros:</h4>
            <div className="Filters">
                <form className="form" onSubmit={handleFilter}>
                <div className="field">
                    <label htmlFor="username">
                        item
                    </label>
                        <input name="item" id="item" 
                        value={filters.item} onChange={(e) => setFilters({...filters, item: e.target.value})} />
                </div>    
                <div className="field">
                    <label htmlFor="description">
                        descrição
                    </label>
                        <input name="description" id="description" 
                        value={filters.desc} onChange={(e) => setFilters({...filters, desc: e.target.value})} />
                </div>
                <div className="field">
                    <label htmlFor="unit">
                        unit
                    </label>
                        <input name="unit" id="unit" 
                        value={filters.un} onChange={(e) => setFilters({...filters, un: e.target.value})}/>
                </div>
                <div className="field">
                    <label htmlFor="am_min">
                        min. amount
                    </label>
                        <input name="am_min" id="am_min" 
                        value={filters.am_min} onChange={(e) => setFilters({...filters, am_min: e.target.value})}/>
                </div>
                <div className="field">
                    <label htmlFor="am_max">
                        max. amount
                    </label>
                        <input name="am_max" id="am_max" 
                        value={filters.am_max} onChange={(e) => setFilters({...filters, am_max: e.target.value})}/>
                </div>
                <div className="actions">
                    <button type="submit">filtrar</button>
                </div>
                </form>
            </div>

            <div className="table-container">
                <table className="records-table" cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>item</th>
                            <th>descrição</th>
                            <th>unidade</th>
                            <th>quantidade</th>
                        </tr> 
                    </thead>
                    <tbody>    
                    { items.map((i) => (
                        <tr key={i.item}>
                            <td>{i.item}</td>
                            <td>{i.description}</td>
                            <td>{i.unit}</td>
                            <td>{i.amount}</td>
                        </tr>
                    ) ) }
                    </tbody> 
                </table>
            </div>
        </div>)
}

export default ItemList