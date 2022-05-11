import React from "react";

const Search = ({
    data: { searchName, filterPersons }, 
}) => {
        return (
            <div>filter shown with: <input
                            value={searchName}  
                            onChange={filterPersons}/>
             </div>
        )
    }
// 

export default Search