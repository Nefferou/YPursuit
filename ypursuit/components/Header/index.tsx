import LogoYPursuit from '../LogoYPursuit';
import IconList from './IconList';
import List from './List';

function Header() {

    return (
        <nav className='flex flex-row justify-between items-end w-full px-8 py-6'>
            <div className='flex flex-row items-end gap-8'>
                <LogoYPursuit />
                <IconList />
            </div>
            <List />
        </nav>
    );
};

export default Header;
