import React, { useEffect, useState } from "react";
import { BalanceProps } from "../models/models.ts";

interface StatisticProps {
    isRightSide: boolean;
}

const Statistic: React.FC<StatisticProps> = ({ isRightSide }) => {
    const [balance, setBalance] = useState<BalanceProps>({ goal: 0, collected: 0 });
    const [sum, setSum] = useState<number>(isRightSide ? balance.goal : balance.collected);

    const logoUrl: string = isRightSide ? "https://send.monobank.ua/img/target.svg" : "https://send.monobank.ua/img/collected.svg";
    const rightBorderClass: string = isRightSide ? "" : "pr-5 border-r border-dividingCol border-opacity-70";
    const label: string = isRightSide ? "Ціль" : "Накопичено";

    const updateBalance = () => {
        const updatedBalance = JSON.parse(localStorage.getItem('balance') || '{ "goal": 0, "collected": 0 }');
        setBalance(updatedBalance);
    };

    useEffect(() => {
        updateBalance();
        const handleBalanceUpdate = () => updateBalance();
        window.addEventListener('balanceUpdated', handleBalanceUpdate);

        return () => {
            window.removeEventListener('balanceUpdated', handleBalanceUpdate);
        };
    }, []);

    useEffect(() => {
        setSum(isRightSide ? balance.goal : balance.collected);
    }, [balance, isRightSide]);

    return (
        <div className="flex relative py-0 px-5 my-3 mx-0 items-center w-1/2">
            <img
                src={logoUrl}
                alt="svg-logo"
                className="w-6 h-6 mr-4 min-w-6"
            />
            <div className={`flex flex-col ${rightBorderClass}`}>
                <div className="font-semibold text-md text-statsTextColor">{label}</div>
                <div className="font-semibold text-lg text-black">{sum} ₴</div>
            </div>
        </div>
    );
}

export default Statistic;
