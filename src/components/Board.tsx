import type { ReactElement } from 'react'
import Cell from './Cell'

interface IBoardProps {
    values: number[]
    changeValue: (index: number) => void
    isGameStarted: boolean
    setHeadingText: (value: string) => void
}

const Board = ({ values, changeValue, isGameStarted, setHeadingText }: IBoardProps): ReactElement => {
    const checkIsGameStarted = (): void => {
        if (!isGameStarted) {
            setHeadingText('Press the Start button')
        }
    }

    return (
        <div className='board flex flex-wrap w-full md:w-3/4 lg:w-fit lg:h-2/4 aspect-square m-auto' onClick={() => { checkIsGameStarted() }}>
            {
                values.map((value, index) => <Cell key={index} cellIndex={index} value={value} changeValue={changeValue}/>)
            }
        </div>
    )
}

export default Board
