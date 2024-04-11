import { useEffect, useState } from "react";
import { BalanceProps } from "../models/models.ts";

interface IJarUrls {
    [key: string]: string;
}

export function JarComponent() {
    const [balance, setBalance] = useState<BalanceProps>(() => {
        const storedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        return {
            collected: storedBalance.collected || 0,
            goal: storedBalance.goal || 0
        };
    });

    const jarUrls: IJarUrls = {
        "0": 'https://send.monobank.ua/img/jar/0.png',
        "33": 'https://send.monobank.ua/img/jar/uah_33.png',
        "50": 'https://send.monobank.ua/img/jar/uah_50.png',
        "100": 'https://send.monobank.ua/img/jar/uah_100.png',
    };

    const [currJarUrl, setCurrJarUrl] = useState<string>(jarUrls["0"]);

    const handleBalanceUpdate = () => {
        const updatedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        setBalance(updatedBalance);
    };

    useEffect(() => {
        handleBalanceUpdate();
        window.addEventListener('balanceUpdated', handleBalanceUpdate);

        return () => {
            window.removeEventListener('balanceUpdated', handleBalanceUpdate);
        };
    }, []);

    useEffect(() => {
        setCurrJarUrl(handleNewJarUrl());
    }, [balance]);

    const handleNewJarUrl = (): string => {
        const percentage: number = (balance.collected / balance.goal) * 100;

        if (percentage > 0 && percentage < 33) {
            return jarUrls["0"];
        } else if (percentage >= 33 && percentage < 50) {
            return jarUrls["33"];
        } else if (percentage >= 50 && percentage < 100) {
            return jarUrls["50"];
        } else if (percentage >= 100) {
            return jarUrls["100"];
        }

        return jarUrls["0"];
    };

    return (
        <div className="w-auto h-fit mt-auto mb-5">
            <div className="relative">
                <img
                    src="https://send.monobank.ua/img/jar_bg.png"
                    alt="jar-bg"
                    className="w-[215px] h-[215px]"
                />
                <div className="absolute top-1/2 left-1/2 transform scale-95 translate-x-[-50%] translate-y-[-50%] origin-center">
                    <img
                        src={currJarUrl}
                        alt="jar"
                        className="max-w-none h-[205px]"
                    /> 
                    <div className="absolute top-[26px] left-[13px]">
                        <img alt="grid" className="w-[42px] h-[168px]" src="https://send.monobank.ua/img/jar/grid.png"/>
                        <div className="absolute bottom-[150px] left-[16px] font-bold text-[10px] text-gridTextCol whitespace-nowrap">
                            {balance.goal}
                        </div>
                        <div className="absolute bottom-[78px] left-[5px] font-bold text-[10px] text-gridTextCol whitespace-nowrap">
                            {balance.goal / 2}
                        </div>
                        <div className="absolute bottom-[2px] left-[7px] font-bold text-[10px] text-gridTextCol whitespace-nowrap">
                            0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
