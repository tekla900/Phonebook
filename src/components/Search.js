import React from "react";

const Search = ({
    data: { searchTerm, filterPersons }, 
}) => {
        return (
            <div>filter shown with: <input
                            value={searchTerm}  
                            onChange={filterPersons}/>
             </div>
        )
    }
// 

export default Search