import React from 'react'
import ListItem from './ListItem'

const List = () => {
    return (
        <div className='flex flex-row items-center gap-6'>
            <ListItem name='LE PROJET' />
            <ListItem name='L&apos;ÉQUIPE' />
            <ListItem name='NOS PERSONNAGES' />
            <ListItem name='GOODIES' />
            <ListItem name='NOUS CONTACTER' />
        </div>
    )
}

export default List