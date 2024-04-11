import {LeftSideComponent} from "./LeftSideComponent.tsx";
import {RightSideComponent} from "./RightSideComponent.tsx";

export function FundraisingSection() {
    return (
        <div className="min-w-[990px] min-h-[680px] bg-white rounded-3xl flex my-4">
            <LeftSideComponent/>
            <RightSideComponent/>
        </div>
    );
}
