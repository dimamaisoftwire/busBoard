import React from "react";

function Home() : React.ReactElement {
    return <header className='h-100' style={{ paddingLeft: 0}}>
        <div
            className='h-100 text-center bg-image'
            style={{ backgroundImage: "url(./HomeBackground.jpg", backgroundSize:1500 }}
        >
            <div className='mask h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                        <h1 className='mb-3'>BusBoard</h1>
                        <h4 className='mb-3'>Something about buses</h4>
                        <a className='btn btn-outline-light btn-lg' href='/arrivals' role='button'>
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
}

export default Home;