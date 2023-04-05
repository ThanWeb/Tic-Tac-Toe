import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import Board from './components/Board'
import ToolBar from './components/ToolBar'

const App = (): ReactElement => {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
    const [firstPlayerTurn, setFirstPlayerTurn] = useState<boolean>(true)
    const [values, setValues] = useState<number[] | any>([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [history, setHistory] = useState<string[]>([])
    const [headingText, setHeadingText] = useState<string>('Let\'s Play!')

    useEffect(() => {
        getVideoBackgroundHeight()
    }, [])

    useEffect(() => {
        checkResult()
        console.log(values)
        console.log(history)
        console.log(firstPlayerTurn)
    }, [values])

    const startTheGame = (): void => {
        setIsGameStarted(true)
        setHeadingText('Player 1\'s turn')
        if (history.length > 0) {
            const resetValues = values.map(() => { return 0 })
            setValues(resetValues)
            setFirstPlayerTurn(true)
        }

        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            if (cell.classList.contains('highlight')) {
                cell.classList.remove('highlight')
            }
        })
    }

    const changeValue = (selectedIndex: number): void => {
        if (values[selectedIndex] === 0 && isGameStarted) {
            const newValues = values.map((value: number, valueIndex: number) => {
                if (valueIndex === selectedIndex) {
                    if (firstPlayerTurn) {
                        setHeadingText('Player 2\'s turn')
                        setFirstPlayerTurn(false)
                        return 1
                    } else {
                        setHeadingText('Player 1\'s turn')
                        setFirstPlayerTurn(true)
                        return 2
                    }
                }
                return value
            })
            setValues(newValues)
        }
    }

    const checkResult = (): void => {
        if (values[0] === values[1] && values[1] === values[2] && values[2] !== 0) {
            finishTheGame(true, [0, 1, 2])
        } else if (values[3] === values[4] && values[4] === values[5] && values[5] !== 0) {
            finishTheGame(true, [3, 4, 5])
        } else if (values[6] === values[7] && values[7] === values[8] && values[8] !== 0) {
            finishTheGame(true, [6, 7, 8])
        } else if (values[0] === values[3] && values[3] === values[6] && values[6] !== 0) {
            finishTheGame(true, [0, 3, 6])
        } else if (values[1] === values[4] && values[4] === values[7] && values[7] !== 0) {
            finishTheGame(true, [1, 4, 7])
        } else if (values[2] === values[5] && values[5] === values[8] && values[8] !== 0) {
            finishTheGame(true, [2, 5, 8])
        } else if (values[0] === values[4] && values[4] === values[8] && values[8] !== 0) {
            finishTheGame(true, [0, 4, 8])
        } else if (values[2] === values[4] && values[4] === values[6] && values[6] !== 0) {
            finishTheGame(true, [2, 4, 6])
        } else if (checkEveryValue()) {
            finishTheGame(false, [])
        }
    }

    const checkEveryValue = (): boolean => {
        const result = values.every((value: number) => { return value > 0 })
        return result
    }

    const finishTheGame = (isWinnerFound: boolean, cellsIndex: number[]): void => {
        setIsGameStarted(false)
        let result = ''

        if (isWinnerFound) {
            result = `Player ${firstPlayerTurn ? '2' : '1'} wins the game!`
            const cells = document.querySelectorAll('.cell')
            cellsIndex.forEach((value, index) => {
                setTimeout(() => { cells[value].classList.add('highlight') }, (1 + index) * 100)
            })
        } else {
            result = 'The game ends in a draw'
        }

        const newHistory = history.map((value: string) => { return value })
        newHistory.push(result)
        setHeadingText(result)
        setHistory(newHistory)
    }

    const getVideoBackgroundHeight = (): void => {
        const vh = window.innerHeight * 0.01
        document?.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    return (
        <div className='flex flex-col justify-center bg-dark-blue'>
            <div className='container flex flex-col height-viewport px-12 pt-8 pb-16 lg:py-16'>
                <h1 className='text-center tracking-wide'>{headingText}</h1>
                <Board values={values} changeValue={changeValue} />
                <ToolBar isGameStarted={isGameStarted} startTheGame={startTheGame} history={history} />
            </div>
        </div>
    )
}

export default App
