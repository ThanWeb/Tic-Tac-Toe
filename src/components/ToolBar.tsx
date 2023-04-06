import type { ReactElement } from 'react'
import { TbArrowsMaximize, TbArrowsMinimize, TbArrowForwardUp } from 'react-icons/tb'

interface IToolBarProps {
    isGameStarted: boolean
    values: number[]
    startTheGame: () => void
    history: string[]
    isHistoryShowed: boolean
    toggleHistory: () => void
}

const ToolBar = ({ isGameStarted, values, startTheGame, history, isHistoryShowed, toggleHistory }: IToolBarProps): ReactElement => {
    return (
        <div className='w-full flex items-center justify-center gap-x-8 pb-4'>
            <button disabled={!(isGameStarted && values.includes(1))} onClick={() => { startTheGame() }} className={`${isGameStarted && values.includes(1) ? 'opacity-100' : 'opacity-0'} w-3/12 text-center transition-fast`}>
                <TbArrowForwardUp className='w-8 h-8 mx-auto' />
                <span>Reset</span>
            </button>
            <button disabled={isGameStarted} onClick={() => { startTheGame() }} className={`${isGameStarted ? 'opacity-0' : 'opacity-100 border'} border-orange rounded-lg px-4 py-2 transition-fast w-full`}>
                {
                    history.length > 0 ? 'Play Again' : 'Start The Game!'
                }
            </button>
            <button onClick={() => { toggleHistory() }} className='text-center w-3/12'>
                {
                    isHistoryShowed ? <TbArrowsMinimize className='w-8 h-8 mx-auto' /> : <TbArrowsMaximize className='w-8 h-8 mx-auto' />
                }
                <span>History</span>
            </button>
        </div>
    )
}

export default ToolBar
