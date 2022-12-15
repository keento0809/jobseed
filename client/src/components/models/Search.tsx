import React from 'react';

type SearchProps = {
    filteredChildren: string,
    setFilteredChildren: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({filteredChildren, setFilteredChildren}: SearchProps) => {

    return (
        <div className="col-span-7 h-10">
            <input
                type="text"
                placeholder="Search company by name"
                value={filteredChildren}
                onChange={(e)=> {setFilteredChildren(e.currentTarget.value)}}
                className="px-4 block h-full input border w-full rounded-lg"/>
        </div>
    );
};

export default Search;