import React from "react";

interface IncrementButtonProps {
    value: number;
    handleIncrement: (value: number) => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = (props) => {
    const handleClick = () => {
        props.handleIncrement(props.value);
    };

    return (
        <>
            <div
                tabIndex={0}
                className="bg-white border border-controlsBorderCol rounded-2xl py-2 px-4 cursor-pointer select-none min-h-[40px] flex flex-col items-center justify-center hover:bg-gray-200 "
                onClick={handleClick}
            >
                <div className="font-normal text-lg leading-6">
                    +{props.value}&nbsp;₴
                </div>
            </div>
        </>
    );
}

export default IncrementButton;
