/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback } from 'react'
import { IPhone } from '../../types/types'
import classes from './Phone.module.scss'

export interface IPhoneProps {
  phone: IPhone
  phones: IPhone[]
  setPhones: (phones: any) => void
}

const MAX_PHONES_IN_CART = 5

export const Item: FC<IPhoneProps> = ({ phone, phones, setPhones }) => {
  const { cameras, color, favorite, id, model, release, shape, quantity, img } = phone

  const onCardClick = useCallback(
    (id: string) => {
      const inCartPhones = phones.filter((phone) => phone.inCart)
      if (inCartPhones.length < MAX_PHONES_IN_CART && !phone.inCart) {
        setPhones((prev: IPhone[]) => {
          return prev.map((phone: IPhone) => {
            if (phone.id === id) {
              phone.inCart = !phone.inCart
            }
            return phone
          })
        })
      } else if (phone.inCart) {
        setPhones((prev: IPhone[]) => {
          return prev.map((phone: IPhone) => {
            if (phone.id === id) {
              phone.inCart = !phone.inCart
            }
            return phone
          })
        })
      } else {
        alert('Вы не можете добавить больше 5 телефонов в корзину')
      }
    },
    [phone, phones],
  )

  return (
    <div
      className={`${classes.main__item} ${phone.inCart ? classes.active : ''}`}
      onClick={() => onCardClick(id)}
    >
      <h4 className={classes.main__item_title}>{model} </h4>
      <div className={classes.main__item_image}>
        <img src={img} alt={model} />
      </div>

      <ul className={classes.main__item_list}>
        <li className={classes.list__item_quantity}>Количество: {quantity}</li>
        <li className={classes.list__item_releaze}>Дата выхода: {release}</li>
        <li className={classes.list__item_manufacturer}>Производитель: {shape}</li>
        <li className={classes.list__item_color}>Цвет: {color}</li>
        <li className={classes.list__item_cameras}>Количество камер: {cameras}</li>
        <li className={classes.list__item_popular}>Популярный: {favorite}</li>
      </ul>
    </div>
  )
}
