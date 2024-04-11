import { useEffect, useState } from "react";
import IncrementButton from "./controls/IncrementButton.tsx";
import MyInput from "./controls/MyInput.tsx";
import PaymentButton from "./controls/PaymentButton.tsx";
import { useDebounce } from "../hooks/useDebounce.ts";
import { BalanceProps } from "../models/models.ts";
import ManualPayment from "./ManualPayment.tsx";

export function RightSideComponent() {
    const [inputValue, setInputValue] = useState<string>('');
    const [isInputValid, setIsInputValid] = useState<boolean>(true);
    const [needClearing, setNeedClearing] = useState<boolean>(false);
    const [needClearingManual, setNeedClearingManual] = useState<boolean>(false);
    const [balance, setBalance] = useState<BalanceProps>(() => {
        const storedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        return { collected: storedBalance.collected || 0, goal: storedBalance.goal || 0 };
    });

    const debouncedInput = useDebounce(inputValue, 300);
    const errorClass = isInputValid ? "" : "text-red-500";
    const placeholderErrorClass = isInputValid ? "" : "placeholder-red-500";
    const inputClasses = `opacity-[0.4] flex justify-center items-center font-extrabold text-5xl text-center py-5 px-0 transition-opacity ${errorClass}`;

    const handleInputChange = () => {
        if (!inputValue) return;

        const currInputValue = parseInt(inputValue);

        if (currInputValue < 10) {
            setIsInputValid(false);
            setInputValue("");
        } else if (currInputValue > 29999) {
            setInputValue("29999");
        } else {
            setIsInputValid(true);
        }
    };

    const updateInputValue = (value: number) => {
        setInputValue(prev => !prev ? String(value) : String(parseInt(prev) + value));
    };

    const handlePayment = () => {
        if (isInputValid && inputValue) {
            const updatedBalance: BalanceProps = {
                collected: balance.collected + parseInt(inputValue),
                goal: balance.goal
            };
            setBalance(updatedBalance);
            setInputValue('');
            toggleNeedClearing();
            toggleNeedClearingManual();
        }
    };

    const toggleNeedClearing = () => {
        setNeedClearing(prev => !prev);
    };

    const toggleNeedClearingManual = () => {
        setNeedClearingManual(prev => !prev);
    };

    useEffect(() => {
        handleInputChange();
    }, [debouncedInput]);

    useEffect(() => {
        localStorage.setItem('balance', JSON.stringify(balance));
        window.dispatchEvent(new Event('balanceUpdated'));
    }, [balance]);

    return (
        <div className="w-1/2 bg-white rounded-r-3xl relative min-h-[620px] flex flex-col items-center justify-center">
            <div className="w-fit rounded-3xl mt-[42px] mb-8 h-max bg-gradient-to-r from-firstCardGradientCol to-secondCardGradientCol p-[3px]">
                <div className="min-w-[394px] min-h-[163px] p-6 bg-white rounded-3xl flex flex-col justify-center">
                    <div className="text-center font-semibold text-md leading-4 mt-0 flex justify-center items-center">
                        <span>Сума поповнення</span>
                        <img src="https://send.monobank.ua/img/money.png" alt="money" className="w-4 ml-[0.5em] mb-[-3px]"/>
                    </div>
                    <div className={inputClasses} >
                        <div style={{position: 'relative', display: 'flex', alignItems: 'center'  }}>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                value={inputValue}
                                className={`outline-none p-0 w-36 text-right placeholder-gray-950 appearance-none ${placeholderErrorClass}`}
                                style={{ width: inputValue.length > 0 ? `${inputValue.length * 1.5 + 2}rem` : '2rem'}}
                                placeholder={"0"}
                                onChange={(e) => {
                                    let newValue = parseInt(e.target.value) || 0;
                                    newValue = Math.min(newValue, 29999);
                                    setInputValue(String(newValue));
                                }}
                            />
                        </div>
                        <div className="text-center">&nbsp;₴</div>
                    </div>
                    {!isInputValid &&
                        <span className="text-center text-sm -mt-4 mb-2">Сума повинна бути від 10 до 29999</span>
                    }
                    <div className="flex items-center justify-evenly">
                        <IncrementButton value={100} handleIncrement={updateInputValue}/>
                        <IncrementButton value={500} handleIncrement={updateInputValue}/>
                        <IncrementButton value={1_000} handleIncrement={updateInputValue}/>
                    </div>
                </div>
            </div>
            <MyInput inputType="text" placeholder="Ваше ім'я (необов'язково)" maxInputLength={20} isNeedClearing={needClearing} toggleNeedClearing={toggleNeedClearing}/>
            <MyInput inputType="text" placeholder="Коментар (необов'язково)" maxInputLength={35} isNeedClearing={needClearing} toggleNeedClearing={toggleNeedClearing}/>
            <PaymentButton paymentType="mono" onPayment={handlePayment}/>
            <PaymentButton paymentType="gPay" onPayment={handlePayment}/>
            <ManualPayment needClearing={needClearingManual} toggleClearing={toggleNeedClearingManual} pay={handlePayment}/>
        </div>
    );
}
