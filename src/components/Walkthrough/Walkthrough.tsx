import { MultiRouteTourProps } from "multiroute-tour-navigator/lib/MultiRouteTour";
import MultiRouteTour from "multiroute-tour-navigator";
import TourHelper from "./TourHelper";

export default function Walkthrough(props: MultiRouteTourProps){
    return (
        <MultiRouteTour
            {...props}
            helper={TourHelper}
        />
    )
}