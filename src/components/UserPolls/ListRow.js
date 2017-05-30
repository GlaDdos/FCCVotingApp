import React from 'react';
import { Link } from 'react-router';

const ListRow = (props) => {
    return(
        <tr>
            <td><Link to={`/poll/${props.id}`}>{ props.title }</Link></td>
            <td>{ props.time }</td>
            <td>{ props.votes }</td>
            <td onClick={() => {props.deletePoll(props.token, props.id)}}><span className="label label-danger">Delete</span></td>
        </tr>
    );
}

export default ListRow;