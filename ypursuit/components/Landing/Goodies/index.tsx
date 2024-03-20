'use client'

import Button from "../../ui/Buttons/Button"
import cle from "@/assets/images/goodies/goodiesCle.png"
import coque from "@/assets/images/goodies/goodiesCoque.png"
import gourde from "@/assets/images/goodies/goodiesGourde.png"
import Image from "next/image"

const Goodies = () => {
    return <div id="slide5" className="w-full h-screen flex justify-center items-center flex-col bg-greenPrimary border-black border-2">
        <div className="w-full flex justify-start items-center pl-12 pb-12">
            <h2 className="text-4xl font-bold text-white">GOODIES</h2>
        </div>
        <div className="w-full grid gap-4 p-8 grid-cols-4">
            <div className="flex items-center justify-center">
                <Image
                    src={cle}
                    alt="cle"
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex items-center justify-center">
                <Image
                    src={coque}
                    alt="coque"
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex items-center justify-center">
                <Image
                    src={gourde}
                    alt="gourde"
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex items-center justify-center">
                <Button handleClick={() => console.log('Button')}
                    title="Button"
                    design="simple"
                    backgroundColor="white"
                    type="button"
                    disabled={false}
                >
                    Voir la boutique
                </Button>
            </div>
        </div>
    </div>;
}

export default Goodies;