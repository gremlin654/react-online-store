import React from 'react'
import { MyInput } from '../UI/input/MyInput'
import { MySelect } from '../UI/select/MySelect'
import classes from './FilterBlockThree.module.scss'

interface IFilterBlockThree {
  filter: {
    sort: string
    query: string
  }
  setFilter: React.Dispatch<
    React.SetStateAction<{
      sort: string
      query: string
    }>
  >
}

export const FilterBlockThree: React.FC<IFilterBlockThree> = ({ filter, setFilter }) => {
  return (
    <div className={classes.filter__group}>
      <div className={classes.filter__search}>
        <h4 className={classes.filter__title}>Поиск</h4>
        <div className={classes.search__container}>
          <MyInput
            className={classes.search__input}
            placeholder='Поиск...'
            value={filter.query}
            onChange={(event) => setFilter({ ...filter, query: event.target.value })}
          />
        </div>
      </div>
      <div className={classes.filter__type}>
        <h4 className={classes.filter__title}>Сортировка</h4>
        <MySelect
          value={filter.sort}
          onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
          className={classes.type__select}
          defaultValue='По названию, от А до Я'
          options={[
            {
              value: 'modelM',
              name: 'По названию, от Я до А',
            },
            {
              value: 'release',
              name: 'По году, по возростанию',
            },
            {
              value: 'releaseM',
              name: 'По году, по убыванию',
            },
            {
              value: 'quantity',
              name: 'По количеству, по возростанию',
            },
            {
              value: 'quantityM',
              name: 'По количеству, по убыванию',
            },
          ]}
        />
      </div>
      <div className={classes.filter__reset}>
        <button className={classes.reset__button}>Сброс фильтров</button>
        <button className={classes.reset__button}>Сброс настроек</button>
      </div>
    </div>
  )
}
