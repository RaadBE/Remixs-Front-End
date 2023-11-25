import React, {useEffect, useState} from "react";
import axios from "axios";
function Landing() {


    return (
        <div className='landing-main'>
            <div className="card">
                <img src="https://static-00.iconduck.com/assets.00/reddit-logo-icon-512x512-jv3e2p8i.png" className='object-cove' alt=""/>
                <div className="text-body">
                    <h1>TITEL HERE</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolor eius esse ex excepturi explicabo id impedit ipsam ipsum magnam, modi nostrum praesentium, quae quia quidem quis quo sapiente, voluptatem.</p>
                </div>
                <p>icons Here</p>
            </div>
            <div className="card">
                <img src="https://static-00.iconduck.com/assets.00/reddit-logo-icon-512x512-jv3e2p8i.png" className='object-cove' alt=""/>
                <div className="text-body">
                    <h1>TITEL HERE</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolor eius esse ex excepturi explicabo id impedit ipsam ipsum magnam, modi nostrum praesentium, quae quia quidem quis quo sapiente, voluptatem Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consequuntur culpa, cum deserunt eius enim esse eum laborum magni modi mollitia necessitatibus nobis nostrum quia quisquam recusandae reiciendis, rerum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque blanditiis doloribus, esse excepturi fuga illo itaque labore, magnam maxime modi necessitatibus nesciunt pariatur placeat praesentium quia quo ratione, rerum voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eaque, eveniet exercitationem hic molestiae quis recusandae rem! Assumenda labore non quia quibusdam quis! Corporis eos id odio quod tenetur voluptas.</p>
                </div>
                <p>icons Here</p>
            </div>
        </div>
    );
}

export default Landing;
