import type { ReactElement } from 'react'
import { TbHistory } from 'react-icons/tb'
import { MdOutlineRestartAlt } from 'react-icons/md'

interface IBoardProps {
    isGameStarted: boolean
    values: number[]
    startTheGame: () => void
    history: string[]
}

const ToolBar = ({ isGameStarted, values, startTheGame, history }: IBoardProps): ReactElement => {
    return (
        <div className='fixed flex left-0 bottom-0 w-screen items-center justify-center gap-x-8 pb-4'>
            <button onClick={() => { startTheGame() }} className={`${isGameStarted && values.includes(1) ? 'opacity-100 h-fit' : 'opacity-0 h-0'} w-12 text-center transition-fast`}>
                <MdOutlineRestartAlt className='w-8 h-8 mx-auto' />
                <span>Reset</span>
            </button>
            <button onClick={() => { startTheGame() }} className={`${isGameStarted ? 'opacity-0 h-0' : 'opacity-100 h-fit border'} border-orange rounded-lg px-4 py-2 transition-fast`}>
                {
                    history.length > 0 ? 'Play Again' : 'Start The Game!'
                }
            </button>
            <button className='text-center w-12'>
                <TbHistory className='w-8 h-8 mx-auto' />
                <span>History</span>
            </button>
        </div>
    )
}

export default ToolBar
