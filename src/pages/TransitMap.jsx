import TransitMapPhoto from "../assets/Transit-Map.jpg";

export default function TransitMap() {
    return(
        <>
            <img src={TransitMapPhoto} alt="Photo of integrated transit map" className="w-100"/>
            <p className="p-4">Map updated 8 Aug 2023</p>
        </>
    )
}