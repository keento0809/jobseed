import React , {FC} from 'react';

type description = {
    title: string;
    detail: string
}

const Description = (props: description) => {
    return (
        <div>
            <h4><span>☆</span> { props.title } </h4>
            <p> { props.detail } </p>
        </div>
    );
};

export default Description;
