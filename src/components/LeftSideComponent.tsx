import {JarComponent} from "./JarComponent.tsx";
import Statistic from "./Statistic.tsx";

export function LeftSideComponent() {
    return (
        <div className="w-1/2 bg-[#f3f4f6] rounded-l-3xl flex flex-col items-center justify-evenly">
            <img
                src="https://send.monobank.ua/img/logo_short.svg"
                alt="logo"
                className="mx-auto mt-[42px] mb-6"
            />
            <JarComponent/>
            <div className="font-normal text-md text-center text-black leading-4 mt-1">Артем К. збирає
            </div>
            <div className="mt-1 font-extrabold text-[22px] text-center">На ремонт медеваку</div>
            <div className="mt-1 min-w-[340px] flex flex-col items-center justify-center mb-auto">
                <div className="text-md font-normal mt-2 text-center mx-auto mb-0 text-black">
                Збираємо на ремонт медеваку для 4ОТБР танкова бригада<br/> Ремонтуємо 2 автівки - Тойоту та Нісан.<br/>У бригаді є наші земляки з Черкащини!<br/>Ремонт авто треба на вчора! Прохання підтримати!
                </div>
                <div className="flex rounded-2xl mx-auto my-0 text-left justify-center mt-4 bg-white">
                    <Statistic isRightSide={false}/>

                    <Statistic isRightSide={true}/>
                </div>
            </div>
        </div>
    );
}
