import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import './results.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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

    const createMarkup = (markdownText) => {
        const adjustedText = markdownText.replace(/\n\n/g, '\n');
        const rawMarkup = marked(adjustedText);
        const cleanMarkup = DOMPurify.sanitize(rawMarkup);
        return { __html: cleanMarkup };
    };


    // Function to rearrange posts based on your specified pattern
    const rearrangePosts = (posts) => {
        let youtubeDailymotionPosts = posts.filter(post => post.platform === 'YouTube' || post.platform === 'Dailymotion');
        let redditPosts = posts.filter(post => post.platform === 'reddit');

        let rearrangedPosts = [];
        let ydIndex = 0; // YouTube/Dailymotion index
        let rIndex = 0;  // Reddit index

        // Repeat the pattern until all posts are arranged
        while (ydIndex < youtubeDailymotionPosts.length || rIndex < redditPosts.length) {
            // One spot for YouTube/Dailymotion
            if (ydIndex < youtubeDailymotionPosts.length) {
                rearrangedPosts.push(youtubeDailymotionPosts[ydIndex++]);
            }

            // First spot for Reddit
            if (rIndex < redditPosts.length) {
                rearrangedPosts.push(redditPosts[rIndex++]);
            }

            // Second spot for Reddit
            if (rIndex < redditPosts.length) {
                rearrangedPosts.push(redditPosts[rIndex++]);
            }

            // One more spot for YouTube/Dailymotion
            if (ydIndex < youtubeDailymotionPosts.length) {
                rearrangedPosts.push(youtubeDailymotionPosts[ydIndex++]);
            }
        }

        return rearrangedPosts;
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
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            value={location.search}
                            onChange={e => setSearchResults(e.target.value)}
                            placeholder="Search here"
                        />
                    </div>
                </div>
                <div className='landing-main'>
                    {Array.isArray(arrangedSearchResults) && (
                        arrangedSearchResults.map((post, index) => (
                            <div key={index} className={post.platform === 'reddit' ? "reddit-card" : "card"}>
                                <b>
                                    {post.platform === 'reddit' ?
                                        <>
                                            <a href={post.url}>{post.title}</a>
                                            {" posted by u/" + post.author + " on " + new Date(post.date * 1000).toUTCString()}
                                        </> :
                                        ''
                                    }
                                </b>


                                {post.platform === 'reddit' && (
                                    <div className='reddit-cont'>
                                        <div className='left-imgg'>
                                            {post.platform === 'reddit' && <img src={post.imgs} alt="card" />}
                                        </div>
                                        <div className='reddit-text'>
                                            {post.platform === 'reddit' && <div className='mark' dangerouslySetInnerHTML={createMarkup(post.richtext)} />}
                                        </div>
                                    </div>
                                )}

                                {post.platform !== 'reddit' && <img src={post.imgs} alt="card" className='' />}
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
