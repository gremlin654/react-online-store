import React, { useCallback, useEffect, useState } from 'react'
import { IPhone, LOCAL_STORAGE_KEYS, IPropsPhones } from '../../../types/types'
import classes from './Main.module.scss'
import { Items } from '../../common/Phones'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { MySelect } from '../../UI/select/MySelect'
import { phonesData } from '../../../data/phones'

const COLORS = ['белый', 'желтый', 'красный']
const COLORSCLASS = ['white', 'yellow', 'red']
const CAMERAS = ['1', '2', '3']
const SHAPE = ['Samsung', 'Apple', 'Xiaomi']
const INITFILTERSHAPES = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.filterShape) ?? '[]')
const INITFILTERCAMERAS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.filterCameras) ?? '[]')
const INITFILTERCOLORS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.filterColor) ?? '[]')
const INITFILTERPOPULAR = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEYS.filterPopular) ?? 'false',
)
const INITFILTERRELEASE = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.filterRelease) ?? '[]')
const INITFILTERQUANTITY = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEYS.filterQuantity) ?? '[]',
)
const INITSEARCH = localStorage.getItem(LOCAL_STORAGE_KEYS.search) ?? ''
const INITSORTEDBYPARAMETER = localStorage.getItem(LOCAL_STORAGE_KEYS.sortedByParameter) ?? ''

export const Main = ({ phones, setPhones }: IPropsPhones) => {
  const [filterShape, setFilterShape] = useState<string[]>(INITFILTERSHAPES)
  const [filterCameras, setFilterCameras] = useState<string[]>(INITFILTERCAMERAS)
  const [filterColor, setFilterColor] = useState<string[]>(INITFILTERCOLORS)
  const [filterPopular, setPopular] = useState<boolean>(INITFILTERPOPULAR)
  const [filterRelease, setFilterRelease] = useState<number[]>(INITFILTERRELEASE)
  const [filterQuantity, setFilterQuantity] = useState<number[]>(INITFILTERQUANTITY)
  const [search, setSearch] = useState<string>(INITSEARCH)
  const [sortedByParameters, setSortedByParameters] = useState<string>(INITSORTEDBYPARAMETER)
  const [filterClear, setFilterClear] = useState<boolean>(false)
  const [allClear, setAllClear] = useState<boolean>(false)

  const changeFilterShape = useCallback(
    (parameter: string) => {
      if (filterShape.includes(parameter)) {
        setFilterShape(filterShape.filter((shape) => shape !== parameter))
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.filterShape,
          JSON.stringify(filterShape.filter((shape) => shape !== parameter)),
        )
      } else {
        setFilterShape([...filterShape, parameter])
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.filterShape,
          JSON.stringify([...filterShape, parameter]),
        )
      }
    },
    [filterShape],
  )

  const changeFilterCameras = useCallback(
    (parameter: string) => {
      if (filterCameras.includes(parameter)) {
        setFilterCameras(filterCameras.filter((camera) => camera !== parameter))
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.filterCameras,
          JSON.stringify(filterCameras.filter((camera) => camera !== parameter)),
        )
      } else {
        setFilterCameras([...filterCameras, parameter])
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.filterCameras,
          JSON.stringify([...filterCameras, parameter]),
        )
      }
    },
    [filterCameras],
  )

  const changeFilterColor = useCallback(
    (parameter: string) => {
      if (filterColor.includes(parameter)) {
        setFilterColor(filterColor.filter((color) => color !== parameter))
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.filterColor,
          JSON.stringify(filterColor.filter((color) => color !== parameter)),
        )
      } else {
        setFilterColor([...filterColor, parameter])
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.filterColor,
          JSON.stringify([...filterColor, parameter]),
        )
      }
    },
    [filterColor],
  )

  const changeFilterPopular = useCallback(
    (parameter: boolean) => {
      if (filterPopular === parameter) {
        setPopular(!filterPopular)
        localStorage.setItem(LOCAL_STORAGE_KEYS.filterPopular, JSON.stringify(!filterPopular))
      } else {
        setPopular(parameter)
        localStorage.setItem(LOCAL_STORAGE_KEYS.filterPopular, JSON.stringify(parameter))
      }
    },
    [filterPopular],
  )
  const changeFilterRelease = useCallback(
    (parameter: number[] | number) => {
      setFilterRelease(parameter as number[])
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterRelease, JSON.stringify(parameter as number[]))
    },
    [filterRelease],
  )
  const changeFilterQuntity = useCallback(
    (parameter: number[] | number) => {
      setFilterQuantity(parameter as number[])
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterQuantity, JSON.stringify(parameter as number[]))
    },
    [filterQuantity],
  )

  const searchPhones = useCallback(
    (parameter: string, e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setSearch(parameter)
      localStorage.setItem(LOCAL_STORAGE_KEYS.search, parameter)
    },
    [search],
  )

  const resetSearchPhones = useCallback(() => {
    setSearch('')
    localStorage.setItem(LOCAL_STORAGE_KEYS.search, '')
  }, [search])

  const changeSortedByParameters = useCallback(
    (parameter: string) => {
      setSortedByParameters(parameter)
      console.log(parameter)
      localStorage.setItem(LOCAL_STORAGE_KEYS.sortedByParameter, parameter)
    },
    [sortedByParameters],
  )

  useEffect(() => {
    let filteredData: IPhone[] = phonesData
    const filterLocalColor: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.filterColor) ?? '[]',
    )
    const filterLocalCameras: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.filterCameras) ?? '[]',
    )
    const filterLocalShape: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.filterShape) ?? '[]',
    )
    const filterLocalPopular: boolean = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.filterPopular) ?? 'false',
    )
    const filterLocalRelease: number[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.filterRelease) ?? '[]',
    )
    const filterLocalQuantity: number[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.filterQuantity) ?? '[]',
    )
    const Search: string = localStorage.getItem(LOCAL_STORAGE_KEYS.search) ?? ''
    const sortedLocalByParameters: string =
      localStorage.getItem(LOCAL_STORAGE_KEYS.sortedByParameter) ?? ''

    if (sortedLocalByParameters === 'model') {
      filteredData = [...filteredData].sort((a, b) => a['model'].localeCompare(b['model']))
    }
    if (sortedLocalByParameters === 'modelM') {
      filteredData = [...filteredData].sort((a, b) => b['model'].localeCompare(a['model']))
    }
    if (sortedLocalByParameters === 'quantity') {
      filteredData = [...filteredData].sort((a, b) => a['quantity'] - b['quantity'])
    }
    if (sortedLocalByParameters === 'quantityM') {
      filteredData = [...filteredData].sort((a, b) => b['quantity'] - a['quantity'])
    }
    if (sortedLocalByParameters === 'release') {
      filteredData = [...filteredData].sort((a, b) => a['release'] - b['release'])
    }
    if (sortedLocalByParameters === 'releaseM') {
      filteredData = [...filteredData].sort((a, b) => b['release'] - a['release'])
    }

    if (filterLocalColor.length) {
      filteredData = filteredData.filter((post) => filterColor.includes(post.color))
    }
    if (filterLocalCameras.length) {
      filteredData = filteredData.filter((post) => filterCameras.includes(post.cameras))
    }
    if (filterLocalShape.length) {
      filteredData = filteredData.filter((post) => filterShape.includes(post.shape))
    }
    if (filterLocalPopular) {
      filteredData = filteredData.filter((post) => post.popular === true)
    }
    if (filterLocalRelease.length) {
      filteredData = filteredData.filter(
        (post) => post.release >= filterLocalRelease[0] && post.release <= filterLocalRelease[1],
      )
    }
    if (filterLocalQuantity.length) {
      filteredData = filteredData.filter(
        (post) =>
          post.quantity >= filterLocalQuantity[0] && post.quantity <= filterLocalQuantity[1],
      )
    }
    if (Search) {
      setSearch(Search)
      filteredData = filteredData.filter((post) =>
        post.model.toLowerCase().includes(Search.toLowerCase()),
      )
    }

    if (filterClear) {
      setFilterClear(false)
      setFilterColor([])
      setFilterCameras([])
      setPopular(false)
      setFilterShape([])
      setSearch('')
      setFilterRelease([2000, 2022])
      setFilterQuantity([1, 12])
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterColor, JSON.stringify([]))
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterCameras, JSON.stringify([]))
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterShape, JSON.stringify([]))
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterPopular, JSON.stringify(false))
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterRelease, JSON.stringify([2000, 2022]))
      localStorage.setItem(LOCAL_STORAGE_KEYS.filterQuantity, JSON.stringify([1, 12]))
      localStorage.setItem(LOCAL_STORAGE_KEYS.search, '')
      filteredData = phonesData
    }
    if (allClear) {
      setAllClear(false)
      setFilterColor([])
      setFilterCameras([])
      setPopular(false)
      setFilterShape([])
      setSearch('')
      setFilterRelease([2000, 2022])
      setFilterQuantity([1, 12])
      setSortedByParameters('')
      localStorage.clear()
      filteredData = phonesData
      window.location.reload()
    }
    setPhones(filteredData)
  }, [
    filterColor,
    filterCameras,
    filterShape,
    filterPopular,
    search,
    filterRelease,
    filterQuantity,
    sortedByParameters,
    allClear,
    filterClear,
  ])

  return (
    <main className={classes.main}>
      <div className={classes.main__container}>
        <div className={classes.filter__container}>
          <div className={classes.filter__group}>
            <h4 className={classes.filter__title}>Фильтры по значению</h4>
            <div>
              <div className={classes.filter__by_shape}>
                Производитель:
                <ul className={classes.shape__list}>
                  {SHAPE.map((shape: string) => (
                    <button
                      className={`${classes.shape__button} ${
                        filterShape.includes(shape) ? classes.active : ''
                      }`}
                      key={shape}
                      onClick={() => {
                        changeFilterShape(shape)
                      }}
                    >
                      {shape}
                    </button>
                  ))}
                </ul>
              </div>
              <div className={classes.filter__by_size}>
                Количество камер:
                <ul className={classes.size__list}>
                  {CAMERAS.map((camera) => (
                    <button
                      className={`${classes.size__button} ${
                        filterCameras.includes(camera) ? classes.active : ''
                      }`}
                      key={camera}
                      data-testid={camera}
                      onClick={() => {
                        changeFilterCameras(camera)
                      }}
                    >
                      {camera}
                    </button>
                  ))}
                </ul>
              </div>
              <div className={classes.filter__by_color}>
                Цвет:
                <ul className={classes.color__list}>
                  {COLORS.map((color: string, index: number) => (
                    <button
                      className={`${classes.color__button} ${COLORSCLASS[index]} ${
                        filterColor.includes(color) ? classes.active : ''
                      }`}
                      onClick={() => {
                        changeFilterColor(color)
                      }}
                      key={color}
                      data-testid={color}
                    >
                      {color}
                    </button>
                  ))}
                </ul>
              </div>
              <div className={classes.filter__by_favorite}>
                Только популярные:
                <div>
                  <button
                    className={`${classes.favorite__button} ${filterPopular ? classes.active : ''}`}
                    onClick={() => {
                      changeFilterPopular(true)
                    }}
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.filter__group}>
            <h4 className={classes.filter__title}>Фильтры по диапазону</h4>
            <div>
              <div>
                <h4 className={classes.slider__title}>По году выхода</h4>
                <div className={classes.slider__container}>
                  <div className={classes.slider__count}>
                    {filterRelease[0] ? filterRelease[0] : 2000}
                  </div>
                  <Slider
                    range
                    step={1}
                    min={2000}
                    max={2022}
                    defaultValue={filterRelease}
                    value={filterRelease}
                    onChange={(value) => changeFilterRelease(value)}
                  />
                  <div className={classes.slider__count}>
                    {filterRelease[1] ? filterRelease[1] : 2022}
                  </div>
                </div>
              </div>
              <div>
                <h4 className={classes.slider__title}>По количеству на складе</h4>
                <div className={classes.slider__container}>
                  <div className={classes.slider__count}>
                    {filterQuantity[0] ? filterQuantity[0] : 1}
                  </div>
                  <Slider
                    range
                    step={1}
                    min={1}
                    max={10}
                    value={filterQuantity}
                    defaultValue={filterQuantity}
                    onChange={(value) => changeFilterQuntity(value)}
                  />
                  <div className={classes.slider__count}>
                    {filterQuantity[1] ? filterQuantity[1] : 10}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.filter__group}>
            <div className={classes.filter__search}>
              <h4 className={classes.filter__title}>Поиск</h4>
              <div className={classes.search__container}>
                <input
                  className={`${search ? classes.search__input_close : classes.search__input}`}
                  type='text'
                  placeholder='Поиск...'
                  value={search}
                  onChange={(e) => searchPhones(e.currentTarget.value, e)}
                  autoFocus
                  data-testid='input-search'
                />
                <div
                  className={`${search ? classes.search__croos : ''}`}
                  onClick={resetSearchPhones}
                ></div>
              </div>
            </div>
            <div className={classes.filter__type}>
              <h4 className={classes.filter__title}>Сортировка</h4>
              <MySelect
                value={sortedByParameters}
                onChange={(selectedSort) => changeSortedByParameters(selectedSort)}
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
              <button
                className={classes.reset__button}
                onClick={() => {
                  setFilterClear(true)
                }}
              >
                Сброс фильтров
              </button>
              <button
                className={classes.reset__button}
                onClick={() => {
                  setAllClear(true)
                }}
              >
                Сброс настроек
              </button>
            </div>
          </div>
        </div>
        <Items className={classes.items__container} phones={phones} setPhones={setPhones} />
      </div>
    </main>
  )
}
