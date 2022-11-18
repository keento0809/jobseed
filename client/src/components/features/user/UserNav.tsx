import React from 'react';

type nav = {
    showPage: string | null;
    setShowPage: (showPage: string) => void;
}

const UserNav = (props: nav) => {

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const item: HTMLButtonElement = e.currentTarget;
        props.setShowPage(item.textContent!)
    }

    const links = [
        {id: 1, name: "interested"},
        {id: 2, name: "applied"},
        {id: 3, name: "interview"},
        {id: 4, name: "rejected"}
    ]
    return (
        <div className="user_nav">
            <ul className="grid grid-cols-4 text-center font-normal py-6 border-b-2">
                {links.map(link =>
                    <button
                        key={link.id}
                        onClick={clickHandler}
                        className={props.showPage === link.name ? "font-bold" : ""}
                    >{link.name}
                    </button>)}
            </ul>
        </div>
    );
};


export default UserNav;
