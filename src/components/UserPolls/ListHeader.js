import React from 'react';

const ListHeader = () => {
    return(
        <thead>
            <tr>
                <th className="btn-link-3" style={{height: 'inherit'}}>Title</th>
                <th className="btn-link-3 text-center" style={{height: 'inherit'}}>Created</th>
                <th className="btn-link-3 text-center" style={{height: 'inherit'}}>Votes</th>
                <th></th>
            </tr>
        </thead>
    );
}

export default ListHeader;