import React from 'react';
import { Link, browserHistory } from 'react-router';
import Modal from '../Utils/Modal';

const ListRow = (props) => {
    return(
        <tr>
            <td>
            <Link to={`/poll/${props.id}`}>
                <div key={props.id} className="btn-link-3">{props.title}</div>
            </Link></td>
            <td><div className="btn-link-3 text-center">{ props.time }</div></td>
            <td><div className="btn-link-3 text-center">{ props.votes }</div></td>
            <td><div className="btn-link-3 text-center">
                    <span className="label label-success" onClick={() => browserHistory.push(`/user/poll/${props.id}`)}>More</span> 
                    <span className="label label-danger" onClick={() => { props.requestDelete(props.id)}}>Delete</span>
                </div>
            </td>
        </tr>
    );
}

export default ListRow;