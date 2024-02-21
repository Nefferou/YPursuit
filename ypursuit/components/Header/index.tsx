import HeaderNav from '../HeaderNav';
import IconList from '../IconList';
import Logo from '@/assets/images/logoBlack.svg';
import Image from 'next/image';


interface HeaderProps {
  currentSection: number;
  scrollToSection: (sectionNumber: number) => void;
  setCurrentSection: (sectionNumber: number) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, scrollToSection, setCurrentSection }) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white fixed top-0 w-full z-50">
      <div className="flex h-20">
        <div className="flex justify-center items-end">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>
        <IconList />
      </div>
      <HeaderNav
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        setCurrentSection={setCurrentSection}
      />
    </div>
  );
};

export default Header;