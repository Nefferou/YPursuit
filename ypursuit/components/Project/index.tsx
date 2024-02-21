'use client'

import Image from 'next/image';
import Button from '../ui/Buttons/Button';
import imageUrl from '../../assets/images/teams/fullTeam.svg';

const ProjectSection = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-3/5 flex flex-col justify-center items-start p-12">
                <h2 className="text-3xl font-bold mb-4">LE PROJET</h2>
                <p className="text-lg mb-10">
                    Découvrez l&apos;univers captivant de notre tout nouveau jeu web, une fusion innovante entre le plaisir des quizz et l&apos;excitation des jeux de plateau. Plongez dans une aventure ludique où chaque défi représente une filière unique de l&apos;Ecole Ynov, avec des petits personnages charmants incarnant les différentes spécialités. Testez vos connaissances, défiez vos amis et progressez à travers des questions stimulantes, tout en explorant un monde virtuel coloré et enchanteur. Préparez-vous à vivre une expérience éducative divertissante, créée spécialement pour les esprits curieux et passionnés de l&apos;Ecole Ynov. Êtes-vous prêt à relever le défi et à devenir le maître incontesté de ce jeu captivant ? Plongez dans l&apos;aventure dès maintenant !
                    <br />
                    Un projet réalisé et porté par une équipe entièrement composée d&apos;étudiants Ynov, de différentes filières : Informatique, Communication &amp; Marketing, Architecture d&apos;intérieure, Création digitale, Jeux vidéo 3D &amp; Animation, Illustration, Info &amp; Buisness, découvrez les filières !
                </p>
                <Button
                    handleClick={() => console.log('Button')}
                    title="Button"
                    design="double"
                    backgroundColor="white"
                    type="button"
                    disabled={false}
                >
                    DÉCOUVRIR LE CAMPUS
                </Button>
            </div>
            <div className="w-2/5 flex justify-center">
                <Image src={imageUrl} alt="Project Image" width={400} height={300} />
            </div>
        </div>
    );
};

export default ProjectSection;