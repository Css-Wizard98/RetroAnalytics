import React from 'react';
import Scribble from './scribble.svg'

/**
 * @author [Aakash Bhadana](https://github.com/aakashdice)
 * @returns {JSX.Element}
 * @constructor
 */
function NotFound() {
    return (
        <div className='FadeIn-Effect w-100  flex center' style={{
            minHeight:'80vh',
            height:'100%'
        }}>
            <div className='text-center pd4'>
                <img src={Scribble} alt='Not Found' className='mb2 w-100' style={{maxWidth:'300px'}}/>
                <h1 className='fw-bold' style={{fontSize: '3rem'}}>
                    You are Lost
                </h1>
                <h1>
                    This Page does not exist.
                </h1>
            </div>
        </div>
    );
}

export default NotFound;
