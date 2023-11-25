import React, {useEffect, useState} from "react";
import './mainpage.css'
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

function Main() {
    const [searchResults,setSearchResults] = useState([]);
    const [query,SetQuery] = useState('')
    const navigate = useNavigate();

    const handleSearch = async () => {
        // Redirect to the results page with the query as a parameter
        navigate(`/results?q=${encodeURIComponent(query)}`);
    };
    return (
        <div>
            <div className='main-top'>
                <div>
                    <Link to='tos'></Link>
                </div>
                <h1>Remix</h1>
                <div className='search-bar'>
                    <i className="  fa-solid fa-magnifying-glass"></i>
                    <input
                    type="text"
                    value={query}
                    onChange={e => SetQuery(e.target.value)}
                    placeholder="  Search here"
                />
                </div>
                <Button onClick={handleSearch} className='button-custom-blue'>Search</Button>

            </div>
            {Array.isArray(searchResults) && (
                <div className='res'>
                    {searchResults.map((post, index) => {
                        if (post) {
                            return (
                                <Card key={index} className="cards mt-6 w-96">
                                    <CardHeader color="blue-gray" className="relative h-56">
                                        <img src={post.imgs} alt="card" className="h-full w-full object-cover" />
                                    </CardHeader>
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {post.title} {/* Corrected from post[index].title to post.title */}
                                        </Typography>
                                        <p>{post.platform}</p>
                                        <Typography>
                                            {post.richtext} {/* Assuming richtext is the correct field */}
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <Button>Read More</Button>
                                    </CardFooter>
                                </Card>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default Main;