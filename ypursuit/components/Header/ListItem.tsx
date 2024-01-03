import React from 'react'

const ListItem = ({ name } : { name: string }) => {
    return (
        <a href="#" className='text-gray-700 hover:text-gray-900'>
            {name}
        </a>
    )
}

export default ListItem