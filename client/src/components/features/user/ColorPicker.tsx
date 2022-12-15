import React from 'react';

type Props = {
    setColor: (e: React.MouseEvent<HTMLElement>) => void;
    color: string;
    setShowColorPallet: React.Dispatch<React.SetStateAction<boolean>>;
    showColorPallet: boolean;
}

const ColorPicker = ({setColor, color, showColorPallet,setShowColorPallet} : Props) => {


    return (
        <div className="font-thin flex items-center gap-2 cursor-pointer relative">
            <div
                className={`w-[15px] h-[15px] rounded-md bg-[${color}]`}
                onClick={() => setShowColorPallet(!showColorPallet)}
            ></div>
            <p>Color picker</p>
            <div className={`${showColorPallet ? null : "hidden"} absolute top-8 flex w-2/5 justify-between`}>
                <div onClick={setColor} id="#dc143c" className="shadow-sm w-[15px] h-[15px] rounded-md bg-[#dc143c] cursor-pointer"></div>
                <div onClick={setColor} id="#ffff00" className="shadow-sm w-[15px] h-[15px] rounded-md bg-[#ffff00] cursor-pointer"></div>
                <div onClick={setColor} id="#0000ff" className="shadow-sm w-[15px] h-[15px] rounded-md bg-[#0000ff] cursor-pointer"></div>
                <div onClick={setColor} id="#9932cc" className="shadow-sm w-[15px] h-[15px] rounded-md bg-[#9932cc] cursor-pointer"></div>
                <div onClick={setColor} id="#ff69b4" className="shadow-sm w-[15px] h-[15px] rounded-md bg-[#ff69b4] cursor-pointer"></div>
            </div>
        </div>
    );
};

export default ColorPicker;