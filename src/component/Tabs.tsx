import { useDispatch, useSelector } from 'react-redux'
import Badge from './Badge'
import { toggleMygoTabClicked } from '../state/slice'
import type { RootState, AppDispatch } from '../state/store'

const Tabs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const mygoTabClicked = useSelector((state: RootState) => state.content.mygoTabClicked)

  const handleClick = () => {
    dispatch(toggleMygoTabClicked())
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-block rounded-t-lg border-b-2 p-4 transition-colors duration-300 ease-in-out hover:cursor-pointer ${
          mygoTabClicked
            ? 'border-transparent hover:text-gray-300'
            : 'border-blue-500 text-blue-500'
        }`}
      >
        Ave Mujica
        <Badge category={'ave_mujica'} />
      </button>
      <button
        onClick={handleClick}
        className={`inline-block rounded-t-lg border-b-2 p-4 transition-colors duration-300 ease-in-out hover:cursor-pointer ${
          mygoTabClicked
            ? 'border-blue-500 text-blue-500'
            : 'border-transparent hover:text-gray-300'
        }`}
      >
        MyGO!!!!!
        <Badge category={'mygo'} />
      </button>
    </>
  )
}

export default Tabs
