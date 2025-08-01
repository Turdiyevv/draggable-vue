
import { Dark } from 'quasar'

export default async () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    Dark.set(true)
  } else {
    Dark.set(false)
  }
}

