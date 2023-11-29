import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import './results.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function Landing() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://floating-lake-46912-b5b89c67b62e.herokuapp.com/search?q=${encodeURIComponent(query)}`);
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

    const selectVideo = (post) => {
        if (post.platform === 'YouTube') {
            setSelectedVideo({
                title: post.title,
                richtext: post.richtext,
                videoId: post.videoId,
                views: post.views,
                platform: post.platform,
                imgUrl: post.imgs
            });
        }
    }

    const getEmbedUrl = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}`;
    };

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
                    {Array.isArray(searchResults) && searchResults.map((post, index) => {
                        if (post.platform === 'reddit' && post.imgs && post.richtext) {
                            return (
                                <div key={index} className="reddit-card" onClick={() => selectVideo(post)}>
                                    <a href={post.url}>{post.title}</a>
                                    <span>{" posted by u/" + post.author + " on " + new Date(post.date * 1000).toUTCString()}</span>
                                    <div className='reddit-cont'>
                                        <div className='left-imgg'>
                                            <img src={post.imgs} alt="post" />
                                        </div>
                                        <div className='reddit-text'>
                                            <div className='mark' dangerouslySetInnerHTML={createMarkup(post.richtext)} />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (post.platform !== 'reddit') {
                            return (
                                <div key={index} className="card" onClick={() => selectVideo(post)}>
                                    <img src={post.imgs} alt={post.title} />
                                    {post.platform !== 'reddit' && <p className='text-overlay'>{post.views}</p>}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            {selectedVideo && selectedVideo.platform === 'YouTube' && (
                <div className="video-modal" onClick={() => setSelectedVideo(null)}>
                    <div className="video-container" onClick={e => e.stopPropagation()}>
                        <iframe
                            width="560"
                            height="315"
                            src={getEmbedUrl(selectedVideo.videoId)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Landing;
