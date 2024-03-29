import HeaderNavClassic from '../HeaderNavClassic';
import IconList from '../IconList';
import Logo from '@/assets/images/logoBlack.svg';
import Image from 'next/image';




const HeaderClassic: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white fixed top-0 w-full z-50">
      <div className="flex h-20">
        <div className="flex justify-center items-end">
          <Image src={Logo} alt="Logo" width={120} height={50} />
        </div>
        <IconList />
      </div>
      <HeaderNavClassic />
    </div>
  );
};

export default HeaderClassic;