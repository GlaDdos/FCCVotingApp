import React from 'react';

import ListHeader from './ListHeader';
import ListRow from './ListRow';

const List = (props) => {
    let body = null;

    if(props.isSuccess){
        body = 
            <div className="list-group">
            {
                props.polls.map((poll, index) => (
                    <ListRow index={index} 
                        title={poll.title} 
                        name={poll.owner.profile.firstName} 
                        time={new Date(poll.date).toLocaleDateString()} 
                        votes={poll.votes}
                        id={poll._id}
                    />
                ))
            }
            </div>
    } else {
        body = <div className="centered"><p>Data is fetching</p></div>
    }

    return (
        <div className="container-fluid">
        <div className="panel panel-info">
            <div className="panel-heading">
                <div className="centered">
                    <h4>{ props.listTitle }</h4>
                </div>
            </div>

            <div className="panel-body">
                <ListHeader />
                {body}
            </div>
        </div>
        </div>
    )
}

export default List;