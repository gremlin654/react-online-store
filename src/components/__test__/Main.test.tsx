import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IPhone } from '../../types/types'
import { Main } from '../page/Main/Main'
import '@testing-library/jest-dom/extend-expect'

describe('Main', () => {
  test('filters', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const filterBlockOne = screen.getByText(/Производитель:/i)
    const filterBlockTwo = screen.getByText(/Количество камер:/i)
    const filterBlockThree = screen.getByText(/Цвет:/i)
    const filterBlockFour = screen.getByText(/Только популярные:/i)

    expect(filterBlockOne).toBeInTheDocument()
    expect(filterBlockTwo).toBeInTheDocument()
    expect(filterBlockThree).toBeInTheDocument()
    expect(filterBlockFour).toBeInTheDocument()
  })
  test('screen buttons color', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const buttonElement = screen.getByTestId(/красный/i)
    expect(buttonElement).toMatchSnapshot()
  })
  test('input', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    expect(screen.queryByTestId('input-search')).toContainHTML('')
  })
  test('input have focus', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const input = screen.getByPlaceholderText(/Поиск.../i)
    expect(input).toHaveFocus()
  })
  test('input event', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const input = screen.getByPlaceholderText(/Поиск.../i)
    expect(screen.queryByTestId('input-search')).toContainHTML('')
    fireEvent.input(input, {
      target: { value: '123' },
    })
    expect(screen.queryByTestId('input-search')).toContainHTML('123')
  })
})

test('does not should element', () => {
  render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
  const filterBlock = screen.queryAllByText(/Разновидность:/i)
  expect(filterBlock).toStrictEqual([])
})

describe('should buttons styles', () => {
  test('button color have class active', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const btnColor1 = screen.getByTestId(/белый/i)
    const btnColor2 = screen.getByTestId(/желтый/i)
    const btnColor3 = screen.getByTestId(/красный/i)
    fireEvent.click(btnColor1)
    fireEvent.click(btnColor2)
    fireEvent.click(btnColor3)
    expect(btnColor1).toHaveClass('active')
    expect(btnColor2).toHaveClass('active')
    expect(btnColor3).toHaveClass('active')
  })
  test('button color have not class active', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const btnColor1 = screen.getByTestId(/белый/i)
    const btnColor2 = screen.getByTestId(/желтый/i)
    const btnColor3 = screen.getByTestId(/красный/i)
    expect(btnColor1).not.toHaveClass('active')
    expect(btnColor2).not.toHaveClass('active')
    expect(btnColor3).not.toHaveClass('active')
  })
  test('button hover', () => {
    render(<Main phones={[]} setPhones={(phones: IPhone[]) => {}} />)
    const btn = screen.getByTestId(/3/i)
    userEvent.hover(btn)
    expect(userEvent.hover(btn))
  })
})
