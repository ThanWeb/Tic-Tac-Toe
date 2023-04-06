import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'

interface ICellProps {
    cellIndex: number
    value: number
    changeValue: (index: number) => void
}

const Cell = ({ cellIndex, value, changeValue }: ICellProps): ReactElement => {
    const verticallyCellsIndex = [1, 4, 7]
    const horizontallyCellsIndex = [3, 4, 5]
    const [cellValue, setCellValue] = useState<number>(0)

    useEffect(() => {
        setCellValue(value)
    }, [value])

    return (
        <div
            className={`${verticallyCellsIndex.includes(cellIndex) ? 'border-x' : ''} ${horizontallyCellsIndex.includes(cellIndex) ? 'border-y' : ''} cell border-orange text-center w-2/6 lg:w-fit lg:h-2/6 aspect-square`}
            onClick={() => { changeValue(cellIndex) }}
        >
            <div className='w-full h-full flex justify-center items-center'>
                <div className={`sign-container flex items-center justify-center p-4 ${cellValue === 0 ? 'cursor-pointer' : 'cursor-not-allowed active'}`}>
                    {
                        cellValue === 0
                            ? null
                            : cellValue === 1
                                ? <div className='circle-sign w-full h-full relative'>
                                    <div className='line absolute w-full h-full'/>
                                </div>
                                : <div className='cross-sign w-full h-full flex flex-col justify-center items-center relative overflow-hidden'>
                                    <div className='line absolute'/>
                                    <div className='line absolute'/>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cell
