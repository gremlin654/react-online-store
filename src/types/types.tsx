export interface IPhone {
  id: string
  model: string
  img: string
  shape: string
  quantity: number
  release: number
  color: string
  cameras: string
  popular: boolean
  favorite: string
  inCart: boolean
}

export interface IPhoneListProps {
  phonesData: IPhone[]
}

export enum LOCAL_STORAGE_KEYS {
  filterShape = 'filterShape',
  filterCameras = 'filterCameras',
  filterColor = 'filterColor',
  filterPopular = 'filterPopular',
  filterRelease = 'filterRelease',
  filterQuantity = 'filterQuantity',
  search = 'search',
  sortedByParameter = 'sortedByParameter',
}

export interface IPropsPhones {
  phones: IPhone[]
  setPhones: (phones: IPhone[]) => void
}