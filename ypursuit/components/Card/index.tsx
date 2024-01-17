import masterPicture from "../../assets/images/sam 1.png";
import Image from "next/image";
import classes from "./index.module.css";

type Props = {
    name: string;
    description: string;
};


function Card({ name, description }: Props) {
    return (
        <div>
            <Image src={masterPicture} alt="Sam" />
            <div>
                <h2>{name}</h2>
                <p>Présente</p>
            </div>
        </div>
    );
};

export default Card;
