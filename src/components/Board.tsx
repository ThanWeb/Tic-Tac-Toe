import type { ReactElement } from 'react'
import Cell from './Cell'

interface IBoardProps {
    values: number[]
    changeValue: (index: number) => void
}

const Board = ({ values, changeValue }: IBoardProps): ReactElement => {
    return (
        <div className='flex flex-wrap w-full lg:w-fit lg:h-full aspect-square m-auto'>
            {
                values.map((value, index) => <Cell key={index} cellIndex={index} value={value} changeValue={changeValue}/>)
            }
        </div>
    )
}

export default Board
