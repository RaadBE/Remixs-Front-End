import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import  './results.css'

function Landing() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
                setSearchResults(response.data);
            } catch (error) {
                console.log('ERROR', error);
            }
        };
        fetchData();
    }, [location.search]);
    return (
        <div className='results-page'>
            <div className="warpper">
                <div className='landing-main'>
                    {Array.isArray(searchResults) && (
                        searchResults.map((post, index) => (
                            <div key={index} className="card">
                                <img src={post.imgs} alt="card" className='' />
                                <p className="text-overlay">
                                    {post.platform === 'YouTube' ? 'Views:'+post.views : ""}

                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Landing;
