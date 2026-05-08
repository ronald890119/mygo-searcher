import { useSelector } from 'react-redux'
import type { RootState } from '../state/store'

interface BadgeProps {
  category: string
}

const Badge = ({ category = 'default' }: BadgeProps) => {
  const filteredMygoKeys = useSelector((state: RootState) => state.content.filtered_mygoKeys)
  const filteredAveMujicaKeys = useSelector(
    (state: RootState) => state.content.filtered_ave_mujicaKeys
  )

  if (category === 'mygo') {
    return (
      <>
        <span className="sr-only">Notifications</span>
        <div className="-end-2 -top-2 ml-2 inline-flex h-6 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {filteredMygoKeys.length > 99 ? '99+' : filteredMygoKeys.length}
        </div>
      </>
    )
  } else {
    return (
      <>
        <span className="sr-only">Notifications</span>
        <div className="-end-2 -top-2 ml-2 inline-flex h-6 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {filteredAveMujicaKeys.length > 99 ? '99+' : filteredAveMujicaKeys.length}
        </div>
      </>
    )
  }
}

export default Badge
