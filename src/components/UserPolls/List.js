import React from 'react';

import ListHeader from './ListHeader';
import ListRow from './ListRow';

import Loader from '../Utils/Loader';


const List = (props) => {
    let body = null;

    if(props.isSuccess){
        body = 
            <tbody>
            {
                props.polls.map((poll, index) => (
                    <ListRow 
                        key={poll._id}
                        index={index} 
                        title={poll.title} 
                        name={poll.owner.firstName} 
                        time={new Date(poll.date).toLocaleDateString()} 
                        votes={poll.votes}
                        id={poll._id}
                        token={props.token}
                        deletePoll={props.deletePoll}
                        deleteRequest={props.deleteRequest}
                        requestDelete={props.requestDelete}
                    />
                ))
            }
            </tbody>
    }
    return (
        <div className="container-fluid">
        <div className="panel panel-info">
            <div className="panel-heading">
                <div className="centered">
                    <h3>{ props.listTitle }</h3>
                </div>
                {props.isRequesting && <Loader loading={props.isRequesting} />}
            </div>
            <div className="panel-body">
                <table className="table table-hover">
                    <ListHeader />
                    {body}
                </table>
            </div>
        </div>
        </div>
    )
}

export default List;