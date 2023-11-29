import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import './results.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function Landing() {
    const [searchResults, setSearchResults] = useState([]);
    const [activeVideoId, setActiveVideoId] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');

        const fetchData = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
                const response = await axios.get(`YOUR_API_ENDPOINT/search?q=${encodeURIComponent(query)}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('ERROR', error);
            }
        };

        fetchData();
    }, [location.search]);

    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    const handleVideoClick = (videoId) => {
        setActiveVideoId(videoId);
    }

    const closeVideoModal = () => {
        setActiveVideoId(null);
    }

    const VideoModal = ({ videoId }) => {
        if (!videoId) return null;
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
            <div className="video-modal" onClick={closeVideoModal}>
                <div className="video-container" onClick={(e) => e.stopPropagation()}>
                    <iframe
                        width="560"
                        height="315"
                        src={embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        );
    };

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
            {activeVideoId && <VideoModal videoId={activeVideoId} />}
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
                    {arrangedSearchResults.map((post, index) => (
                        <div key={index} className={post.platform === 'reddit' ? "reddit-card" : "card"}>
                            {post.platform === 'reddit' ? (
                                <>
                                    <a href={post.url}>{post.title}</a>
                                    {" posted by u/" + post.author + " on " + new Date(post.date * 1000).toUTCString()}
                                </>
                            ) : null}
                            {post.platform === 'YouTube' ? (
                                <div className="youtube-card" onClick={() => handleVideoClick(post.videoId)}>
                                    <img src={post.imgs} alt={post.title} />
                                    <p>{post.title}</p>
                                </div>
                            ) : null}
                            {post.richtext && post.platform === 'reddit' && (
                                <div className='reddit-text'>
                                    <div className='mark' dangerouslySetInnerHTML={createMarkup(post.richtext)} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Landing;
