import React, {useEffect, useState} from "react";

interface CreditCardFormProps {
    toggleCardData: () => void,
    needClearing: boolean
}

interface CardData {
    expirationMonth: string;
    expirationYear: string;
    cvc2: string;
}

const CreditCardForm: React.FC<CreditCardFormProps> = (props) => {
    const labelClasses: string = 'cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] group-hover:top-[-52px] group-hover:text-sm select-none pb-2';
    const [isMonthInputActive, setIsMonthInputActive] = useState<boolean>(false);
    const [isYearInputActive, setIsYearInputActive] = useState<boolean>(false);
    const [isCVCInputActive, setIsCVCInputActive] = useState<boolean>(false);

    const [cardData, setCardData] = useState<CardData>({
        expirationMonth: '',
        expirationYear: '',
        cvc2: ''
    });

    const monthLabelClasses: string = isMonthInputActive || cardData.expirationMonth !== '' ? labelClasses + " top-[-52px] text-sm" : labelClasses;
    const yearLabelClasses: string = isYearInputActive || cardData.expirationYear !== '' ? labelClasses + " top-[-52px] text-sm" : labelClasses;
    const cvcLabelClasses: string = isCVCInputActive || cardData.cvc2 !== '' ? labelClasses + " top-[-52px] text-sm" : labelClasses;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue = value;

        if (name === 'expirationMonth') {
            if (parseInt(value) > 12 || parseInt(value) === 0) {
                newValue = '';
            }
        }


        setCardData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    useEffect(() => {
        if (cardData.expirationMonth !== '' && cardData.expirationYear !== '' && cardData.cvc2.length === 3)
            props.toggleCardData()
    }, [cardData.expirationMonth, cardData.expirationYear, cardData.cvc2]);

    useEffect(() => {
        if (props.needClearing)
            setCardData({
                expirationMonth: '',
                expirationYear: '',
                cvc2: ''
            })
    }, [props.needClearing])


    return (
        <div
            className="grid grid-cols-3 gap-2 max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border border-solid rounded-2xl bg-transparent py-0 px-4 h-[56px]">
            <div className="flex w-[90px] min-h-[54px] pb-2">
                <div className="group">
                    <input
                        type="tel"
                        inputMode="decimal"
                        pattern="\d*"
                        autoComplete="cc-exp-month"
                        name="expirationMonth"
                        value={cardData.expirationMonth}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            const regex: RegExp = /^[0-9]*$/;

                            if (regex.test(newValue)) {
                                handleChange(e);
                            } else {
                                setCardData((prevState: CardData) => ({
                                    ...prevState,
                                    expirationMonth: ''
                                }));
                            }
                        }}
                        onFocus={() => setIsMonthInputActive(true)}
                        onBlur={() => setIsMonthInputActive(false)}
                        maxLength={2}
                        max={12}
                        className="bg-none text-left text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                    />
                    <label className={monthLabelClasses}>Month</label>
                </div>
                <span
                    className="text-center opacity-[0.2] w-[1px] bg-dividingCol m-auto h-[40px] -left-4 top-0 mt-2"></span>
            </div>
            <div className="flex w-[90px] min-h-[54px] pb-2">
                <div className="group">
                    <input
                        type="tel"
                        inputMode="decimal"
                        pattern="\d*"
                        autoComplete="cc-exp-year"
                        name="expirationYear"
                        value={cardData.expirationYear}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            const regex: RegExp = /^[0-9]*$/;

                            if (regex.test(newValue)) {
                                handleChange(e);
                            } else {
                                setCardData((prevState: CardData) => ({
                                    ...prevState,
                                    expirationYear: ''
                                }));
                            }
                        }}
                        onFocus={() => setIsYearInputActive(true)}
                        onBlur={() => setIsYearInputActive(false)}
                        maxLength={2}
                        className="bg-none text-left text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                    />
                    <label className={yearLabelClasses}>Year</label>
                </div>
                <span
                    className="text-center opacity-[0.2] w-[1px] bg-dividingCol m-auto h-[40px] -left-4 top-0 mt-2"></span>
            </div>
            <div className="w-[90px] min-h-[54px] group">
                <input
                    type="tel"
                    inputMode="decimal"
                    pattern="\d*"
                    autoComplete="cc-csc"
                    name="cvc2"
                    value={cardData.cvc2}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        const regex: RegExp = /^[0-9]*$/;

                        if (regex.test(newValue)) {
                            handleChange(e);
                        } else {
                            setCardData((prevState: CardData) => ({
                                ...prevState,
                                cvc2: ''
                            }));
                        }
                    }}
                    onFocus={() => setIsCVCInputActive(true)}
                    onBlur={() => setIsCVCInputActive(false)}
                    maxLength={3}
                    className="bg-none text-left border-0 text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                />
                <label className={cvcLabelClasses}>CVC2</label>
            </div>
        </div>
    );
}

export default CreditCardForm;
