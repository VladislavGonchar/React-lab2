import React, {useEffect, useState} from "react";

interface CreditCardInputProps {
    placeholder: string,
    toggleCardNum: () => void,
    needClearing: boolean
}

const CreditCardInput: React.FC<CreditCardInputProps> = (props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const containerClasses: string = `max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border-[1px] border-solid rounded-2xl bg-transparent py-0 px-4 h-14 text-lg ${
        isActive ? 'border-black border-2' : ''
    }`;
    const labelClasses: string = `cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] ${
        (isHovered || inputValue !== '' || isActive) ? 'top-[-52px] text-sm' : ''
    } select-none`;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = event.target.value;

        value = value.replace(/\D/g, '');

        value = value.replace(/(\d{4})/g, '$1 ');

        value = value.trim();

        setInputValue(value);
    };

    useEffect(() => {
        if (inputValue.length === 19)
            props.toggleCardNum();
    }, [inputValue]);

    useEffect(() => {
        if (props.needClearing)
            setInputValue('')
    }, [props.needClearing])

    return (
        <div
            className={containerClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type="tel"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                inputMode="decimal"
                pattern="\d*"
                autoComplete="cc-number"
                maxLength={19}
                className="normal-case bg-none text-left border-0 text-black h-10 w-full text-lg rounded-none mt-3 p-0 box-border outline-none"
            />
            <label
                className={labelClasses}
            >
                {props.placeholder}
            </label>
        </div>
    );
}

export default CreditCardInput;
