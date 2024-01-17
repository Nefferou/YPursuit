import Image from "next/image";
import classes from "./index.module.css";

type Props = {
    name: string;
    link: string;
};

function Card({ name, link }: Props) {
    return (
        <div>
            <Image src={link} alt={name} />
            <div>
                <h2>{name}</h2>
                <p>...</p>
            </div>
        </div>
    );
};

export default Card;
