import Image, { StaticImageData } from 'next/image';
import Logo from '@/assets/images/Insta.svg';

interface IconProps {
  src: StaticImageData;
  alt: string;
}

const icons = [
  { src: Logo, alt: 'Logo' },
  // Add more icons here as needed
];

const IconList: React.FC = () => {
  return (
    <div className="flex justify-start items-end gap-2 ml-6">
      {icons.map((icon: IconProps, index: number) => (
        <div key={index}>
          <Image src={icon.src} alt={icon.alt} width={30} height={30} />
        </div>
      ))}
    </div>
  );
};

export default IconList;