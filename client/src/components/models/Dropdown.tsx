import React from "react";

type Props = {
  label: string;
  itemList: string[];
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setCompanyScale: React.Dispatch<React.SetStateAction<string>>;
};

const Dropdown = ({
  label,
  itemList,
  showDropDown,
  setCompanyScale,
}: Props) => {
  const onChangeHandler = (e: any) => {
    setCompanyScale(e.target.value);
  };
  return (
    <div className="dropdown relative w-full">
      <div
        className={`absolute text-center bg-slate-400 w-full rounded ${
          showDropDown ? "block" : "hidden"
        }`}
        onChange={onChangeHandler}
      >
        {itemList.map((item) => (
          <div
            key={item}
            className="py-2 border-b-2 border-white cursor-pointer hover:bg-slate-200"
          >
            <input
              type="radio"
              value={item}
              name={label}
              className="hidden peer"
            />{" "}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
