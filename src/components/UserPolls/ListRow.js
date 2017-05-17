import React from 'react';

const ListRow = (props) => {
    return(
        <div className="row">
            <div className="col-md-5">{ props.title }</div>
            <div className="col-md-3 centered">{ props.time }</div>
            <div className="col-md-3 centered">{ props.votes }</div>
            <div className="col-md-1 centered"><span className="label label-danger">Delete</span></div>
        </div>
    );
}

export default ListRow;