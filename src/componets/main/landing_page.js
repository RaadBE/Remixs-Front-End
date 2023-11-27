import React, {useEffect, useState} from "react";
import axios from "axios";
import './testi.css'
function tex() {

    return (
        <div className='mainn'>
            <div className="cardss">
                <div className="video">
                    <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/XVLHKMAjb54"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </div>
                <div className="video-content">
                    <div className="text-area">
                        <h1>USER HERE</h1>
                        <p>VIDEO title</p>
                        <p>tags</p>
                        <p>maybe comments</p>
                        <p>maybe comments</p>
                        <p>maybe comments</p>
                        <p>maybe comments</p>
                    </div>
                    <div className='vidICons'>
                        video icons here . . .
                    </div>
                </div>
            </div>
        </div>
    );
}

export default tex;
