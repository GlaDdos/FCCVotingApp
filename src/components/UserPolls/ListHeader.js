import React from 'react';

const ListHeader = () => {
    return(
        <div className="row">
            <div className="col-md-5 centered">Title</div>
            <div className="col-md-3 centered">Created</div>
            <div className="col-md-3 centered">Votes</div>
            <div className="col-md-1 centered"></div>
        </div>
    );
}

export default ListHeader;