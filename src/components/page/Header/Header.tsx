import React, { useMemo } from 'react'
import { IPropsPhones } from '../../../types/types'

import './Header.scss'

export const Header: React.FC<IPropsPhones> = ({ phones }) => {
  const IN_CARD_COUNT = useMemo(() => {
    return phones.filter((phone) => phone.inCart).length
  }, [phones])

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__logo'>
          <a href='#'></a>
        </div>
        <div className='header__page'>
          <h1>Mobile Store</h1>
        </div>
        <div className='header__cart'>
          <span>{IN_CARD_COUNT}</span>
        </div>
      </div>
    </header>
  )
}
