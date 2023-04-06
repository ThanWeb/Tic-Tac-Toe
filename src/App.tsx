import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import Board from './components/Board'
import ToolBar from './components/ToolBar'
import History from './components/History'

const App = (): ReactElement => {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
    const [isHistoryShowed, setIsHistoryShowed] = useState<boolean>(false)
    const [firstPlayerTurn, setFirstPlayerTurn] = useState<boolean>(true)
    const [values, setValues] = useState<number[] | any>([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [history, setHistory] = useState<string[]>([])
    const [headingText, setHeadingText] = useState<string>('Let\'s Play!')
    const [alertMessage, setAlertMessage] = useState<string>('')

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
        setIsHistoryShowed(false)
        setHeadingText('Player 1\'s turn')
        const resetValues = values.map(() => { return 0 })
        setValues(resetValues)
        setFirstPlayerTurn(true)
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
        } else if (values[selectedIndex] !== 0 && isGameStarted) {
            setAlertMessage('Please Choose Another Box')
            setTimeout(() => {
                if (alertMessage === '') {
                    setAlertMessage('')
                }
            }, 1500)
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
                setTimeout(() => { cells[value].classList.add('highlight') }, (1 + index) * 150)
            })
        } else {
            result = 'The game ends in a draw'
        }
        setHeadingText(result)
        const date = new Date()
        result += `\n${date.toDateString()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const newHistory = history.map((value: string) => { return value })
        newHistory.push(result)
        setHistory(newHistory)
    }

    const toggleHistory = (): void => {
        setIsHistoryShowed(!isHistoryShowed)
    }

    const getVideoBackgroundHeight = (): void => {
        const vh = window.innerHeight * 0.01
        document?.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    return (
        <div className='flex flex-col justify-center bg-dark-blue'>
            <div className='container flex flex-col height-viewport mx-auto px-12 py-8 lg:py-16'>
                {
                    isHistoryShowed ? <h1 className='text-center tracking-wide text-2xl'>History</h1> : <h1 className='text-center tracking-wide text-2xl'>{headingText}</h1>
                }
                <h1 className='mt-4 h-2 text-center tracking-wide text-1xl'>{alertMessage}</h1>
                {
                    isHistoryShowed ? <History history={history} /> : <Board values={values} changeValue={changeValue} />
                }
                <ToolBar isGameStarted={isGameStarted} values={values} startTheGame={startTheGame} history={history} isHistoryShowed={isHistoryShowed} toggleHistory={toggleHistory}/>
            </div>
        </div>
    )
}

export default App
