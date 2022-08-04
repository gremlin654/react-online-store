/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, cleanup } from '@testing-library/react'
import { IPhone } from '../../types/types'
import { Main } from '../page/Main/Main'

test('should render page component', () => {
  render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
  const pageElement = screen.getByTestId('page-1')
  expect(pageElement).toBeInTheDocument
})
