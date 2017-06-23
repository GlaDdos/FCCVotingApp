import React from 'react';

const ListHeader = () => {
    return(
        <thead>
            <tr>
                <th><div className="btn-link-3" style={{height: 'inherit'}}>Title</div></th>
                <th><div className="btn-link-3 text-center" style={{height: 'inherit'}}>Created</div></th>
                <th><div className="btn-link-3 text-center" style={{height: 'inherit'}}>Votes</div></th>
                <th></th>
            </tr>
        </thead>
    );
}

export default ListHeader;