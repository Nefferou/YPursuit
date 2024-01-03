import { SiInstagram, SiTiktok, SiTwitter } from '@icons-pack/react-simple-icons';

const IconList = () => {
    return (
        <div className='flex flex-row items-center gap-6'>
            <a href="https://www.instagram.com/ypursuit/" target="_blank" rel="noopener noreferrer">
                <SiInstagram size={24} color="#1F2937" />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                <SiTiktok size={24} color="#1F2937" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <SiTwitter size={24} color="#1F2937" />
            </a>
        </div>
    )
}

export default IconList