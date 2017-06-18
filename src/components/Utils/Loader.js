import React from 'react';

const Loader = (props) => {

    if(props.loading) {
        return (
            <div className="loader"><p>Data is fetching</p></div>
        );
    }

    return null;
}

export default Loader;