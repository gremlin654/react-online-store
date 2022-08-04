import React from 'react'
import { IPhone } from '../../types/types'
import { Item } from './Phone'
import classes from '../page/Main/Main.module.scss'

interface IItems {
  className: string
  phones: IPhone[]
  setPhones: (phone: IPhone[]) => void
}

export const Items: React.FC<IItems> = ({ className, phones, setPhones }) => {
  if (!phones.length) {
    return <h1 className={classes.items__null_search}>Ничего не найдено</h1>
  }

  return (
    <div className={className}>
      {phones.map((phone) => (
        <Item phone={phone} key={phone.id} phones={phones} setPhones={setPhones} />
      ))}
    </div>
  )
}
