import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import {Link, useLocation} from "react-router-dom";
import  './results.css'

function Landing() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const [query, SetQuery] = useState(location.search);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://remxis-backend-d24bfcd27e65.herokuapp.com/search?q=${encodeURIComponent(query)}`);
                setSearchResults(response.data);
            } catch (error) {
                console.log('ERROR', error);
            }
        };
        fetchData();
    }, [location.search]);

    // Function to rearrange posts based on your specified pattern
    const rearrangePosts = (posts) => {
        let youtubeDailymotionPosts = posts.filter(post => post.platform === 'YouTube' || post.platform === 'Dailymotion');
        let redditPosts = posts.filter(post => post.platform === 'reddit');

        let rearrangedPosts = [];
        let ydIndex = 0; // YouTube/Dailymotion index
        let rIndex = 0;  // Reddit index

        // Repeat the pattern until all posts are arranged
        while (ydIndex < youtubeDailymotionPosts.length || rIndex < redditPosts.length) {
            // First two spots for YouTube/Dailymotion
            for (let i = 0; i < 2; i++) {
                if (ydIndex < youtubeDailymotionPosts.length) {
                    rearrangedPosts.push(youtubeDailymotionPosts[ydIndex++]);
                }
            }

            // One spot for Reddit
            if (rIndex < redditPosts.length) {
                rearrangedPosts.push(redditPosts[rIndex++]);
            }

            // Then one spot for Reddit again
            if (rIndex < redditPosts.length) {
                rearrangedPosts.push(redditPosts[rIndex++]);
            }

            // Two more spots for YouTube/Dailymotion
            for (let i = 0; i < 2; i++) {
                if (ydIndex < youtubeDailymotionPosts.length) {
                    rearrangedPosts.push(youtubeDailymotionPosts[ydIndex++]);
                }
            }
        }

        return rearrangedPosts;
    }
    function formatDate(timestamp) {
        // Convert Unix timestamp to a Date object
        const date = new Date(timestamp * 1000);
        // Format the date as needed, here using toUTCString for simplicity
        return date.toUTCString();
    }
    const arrangedSearchResults = rearrangePosts(searchResults);

    return (
        <div className='results-page'>
            <div className="wrapper">
                <div className='ttp'>
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
                </div>
                <div className='landing-main'>

                    {Array.isArray(arrangedSearchResults) && (
                        arrangedSearchResults.map((post, index) => (
                            <div key={index} className={post.platform === 'reddit' ? "reddit-card" : "card"}>
                                {post.platform !== 'reddit' && <img src={post.imgs} alt="card" className='' />}
                                <b>{post.platform === 'reddit' ? `posted by u/${post.author} on ${new Date(post.date * 1000).toUTCString()}` : ''}</b>
                                <h1>{post.platform == 'reddit' ? post.title : ''}</h1>
                                <p>{post.platform === 'reddit' ? (post.richtext) : (post.richtext === "" ? (<img src={post.imgs} alt="card" />) : (''))}</p>

                                {post.platform !== 'reddit' && <p className='text-overlay'>{post.views}</p>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

    );
}

export default Landing;
