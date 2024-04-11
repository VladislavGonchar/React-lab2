import React, {useState} from "react";
import CreditCardInput from "./controls/CreditCardInput.tsx";
import CreditCardForm from "./controls/CreditCardForm.tsx";

interface ManualPaymentProps {
    needClearing: boolean,
    toggleClearing: () => void,
    pay: () => void
}

const ManualPayment: React.FC<ManualPaymentProps> = (props) => {
    const [isManualActive, setIsManualActive] = useState<boolean>(false);
    const [isCardNumberEntered, setIsCardNumberEntered] = useState<boolean>(false);
    const [isCardDataEntered, setIsCardDataEntered] = useState<boolean>(false);

    const buttonDisabled: string = (isCardNumberEntered && isCardDataEntered) ? " bg-orange-500 cursor-pointer" : " bg-orange-300 cursor-not-allowed";
    const buttonClasses: string = "min-w-[340px] text-center flex items-center justify-center rounded-2xl p-0 b-0 mx-auto h-[56px] font-bold text-lg mb-[42px] text-white" + buttonDisabled

    const handleClick = () => {
        props.pay();
        props.toggleClearing();
        if (props.needClearing) {
            setIsCardDataEntered(false);
            setIsCardNumberEntered(false);
        }
    }

    return (
        <div className="flex flex-col w-full mx-6 box-border max-w-[340px] mb-10">
            {!isManualActive &&
                <>
                    <div className="mt-6 mb-2 border-t-[0.5px] border-controlsBorderCol"></div>
                    <div
                        className="flex font-normal text-md text-center p-2 cursor-pointer bg-transparent
                    text-manualPaymentCol items-center justify-center w-full box-border transition-all rounded-lg"
                        onClick={() => setIsManualActive(true)}
                    >
                        <img src="https://send.monobank.ua/img/card.svg" alt="card" className="w-4 h-6 mr-2"/>
                        <p className="font-normal text-md text-center">Оплатити карткою</p>
                    </div>
                </>
            }
            {isManualActive &&
                <>
                    <div className="w-[346px] flex items-center mb-6 mx-auto font-normal text-md">
                        <div className="border-t-controlsBorderCol border-[0.5px] flex-grow"></div>
                        <div className="px-4 py-0">або уведіть дані карти</div>
                        <div className="border-t-controlsBorderCol border-[0.5px] flex-grow"></div>
                    </div>
                    <CreditCardInput needClearing={props.needClearing} placeholder={"Номер картки"}
                                     toggleCardNum={() => setIsCardNumberEntered(!isCardNumberEntered)}/>
                    <CreditCardForm needClearing={props.needClearing}
                                    toggleCardData={() => setIsCardDataEntered(!isCardDataEntered)}/>
                    <button
                        disabled={!(isCardNumberEntered && isCardDataEntered)}
                        className={buttonClasses}
                        onClick={handleClick}
                    >
                        Поповнити банку
                    </button>
                </>
            }
        </div>
    );
}
export default ManualPayment;
