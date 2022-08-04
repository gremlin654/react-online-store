import React, { createContext, useContext, useState } from 'react'
import classes from '../../page/Main/Main.module.scss'

interface IThemes {
  active: string
  inactive: string
}
type AvailableThemes = 'active' | 'inactive'

const themes: IThemes = {
  active: classes.active,
  inactive: '',
}

const ThemeContext = createContext({
  theme: themes.active,
  toogle: () => {},
})

interface IThemeProvider {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<AvailableThemes>('inactive')

  return (
    <ThemeContext.Provider
      value={{
        toogle: () => setCurrentTheme(currentTheme === 'inactive' ? 'active' : 'inactive'),
        theme: themes[currentTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

interface IMyButton {
  className: string
  children: React.ReactNode
  value: string | string[]
  onChange: (sort: string) => void
}
export const MyButton: React.FC<IMyButton> = ({ className, children, value, onChange }) => {
  const { theme, toogle } = useContext(ThemeContext)

  return (
    <button
      value={value}
      onClick={(event) => {
        !theme ? onChange(event.currentTarget.innerHTML) : onChange('')
        toogle()
      }}
      className={`${className} ${theme}`}
    >
      {children}
    </button>
  )
}
