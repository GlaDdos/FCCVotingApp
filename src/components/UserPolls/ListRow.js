import React from 'react';

const ListRow = (props) => {
    return(
        <div className="row">
            <div className="col-md-1">{ props.index }</div>
            <div className="col-md-4">{ props.title }</div>
            <div className="col-md-2">{ props.name }</div>
            <div className="col-md-2">{ props.time }</div>
            <div className="col-md-2">{ props.votes }</div>
            <div className="col-md-1">X</div>
        </div>
    );
}

export default ListRow;