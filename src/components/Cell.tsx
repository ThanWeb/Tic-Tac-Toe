import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'

interface ICellProps {
    cellIndex: number
    value: number
    changeValue: (index: number) => void
}

const Cell = ({ cellIndex, value, changeValue }: ICellProps): ReactElement => {
    const [cellValue, setCellValue] = useState<number>(0)

    useEffect(() => {
        setCellValue(value)
    }, [value])

    return (
        <div
            className='cell border-orange text-center border w-2/6 lg:w-fit lg:h-2/6 aspect-square'
            onClick={() => { changeValue(cellIndex) }}
        >
            <div className='w-full h-full flex justify-center items-center'>
                <div className={`sign-container flex items-center justify-center p-4 ${cellValue === 0 ? 'cursor-pointer' : 'cursor-not-allowed active'}`}>
                    {
                        cellValue === 0
                            ? null
                            : cellValue === 1
                                ? <div className='circle-sign w-full h-full'/>
                                : <div className='cross-sign w-full h-full flex flex-col justify-center items-center relative overflow-hidden'>
                                    <div className='line'/>
                                    <div className='line'/>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cell
