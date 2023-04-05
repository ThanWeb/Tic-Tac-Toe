import type { ReactElement } from 'react'
import { TbHistory } from 'react-icons/tb'
import { MdOutlineRestartAlt } from 'react-icons/md'

interface IBoardProps {
    isGameStarted: boolean
    startTheGame: () => void
    history: string[]
}

const ToolBar = ({ isGameStarted, startTheGame, history }: IBoardProps): ReactElement => {
    return (
        <div className='fixed flex left-0 bottom-0 w-screen items-center justify-evenly pb-4'>
            <button className={`${isGameStarted ? 'opacity-100' : 'opacity-0'} flex flex-col transition-fast`}>
                <MdOutlineRestartAlt className='w-8 h-8 mx-auto' />
                <span>Reset</span>
            </button>
            <button onClick={() => { startTheGame() }} className={`${isGameStarted ? 'opacity-0' : 'opacity-100 border'} border-orange rounded-lg h-fit px-4 py-2 transition-fast`}>
                {
                    history.length > 0 ? 'Play Again' : 'Start The Game!'
                }
            </button>
            <button className='flex flex-col'>
                <TbHistory className='w-8 h-8 mx-auto' />
                <span>History</span>
            </button>
        </div>
    )
}

export default ToolBar
