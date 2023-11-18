import React, {useEffect, useState} from "react";
import axios from "axios";
function Main() {
    const [searchResults,setSearchResults] = useState([]);
    const [query,SetQuery] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
            setSearchResults(response.data)
        }catch (error){
            console.log('EROOR',error)
        }
    }
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => SetQuery(e.target.value)}
                placeholder="Enter search term"
            />
            <button onClick={fetchData}>Search</button>
            {Array.isArray(searchResults) && (
                <div>
                    <h2>Reddit Results</h2>
                    <ul>
                        {searchResults.map((text, index) => (
                            <li key={index}>{text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Main;
