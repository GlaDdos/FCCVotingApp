import React from 'react';
import { Link, browserHistory } from 'react-router';
import Modal from '../Utils/Modal';

const ListRow = (props) => {
    return(
        <tr>
            <td style={{verticalAlign: 'middle'}}>
            <Link to={`/poll/${props.id}`}>
                <span key={props.id} className="btn-link-3">{props.title}</span>
            </Link></td>
            <td className="btn-link-3 text-center" style={{verticalAlign: 'middle'}}>{ props.time }</td>
            <td className="btn-link-3 text-center" style={{verticalAlign: 'middle'}}>{ props.votes }</td>
            <td className="btn-link-3 text-center" style={{verticalAlign: 'middle'}}>
                    <span className="label label-success" onClick={() => browserHistory.push(`/user/poll/${props.id}`)}>More</span> 
                    <span className="label label-danger" onClick={() => { props.requestDelete(props.id)}}>Delete</span>
            </td>
        </tr>
    );
}

export default ListRow;