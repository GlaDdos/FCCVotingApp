import React from 'react';

const ListHeader = () => {
    return(
        <div className="row">
            <div className="col-md-1">Lp.</div>
            <div className="col-md-4">Title</div>
            <div className="col-md-2">author</div>
            <div className="col-md-2">Created</div>
            <div className="col-md-2">Votes</div>
            <div className="col-md-1"></div>
        </div>
    );
}

export default ListHeader;