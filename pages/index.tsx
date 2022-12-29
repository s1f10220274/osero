import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { Box, chakra } from '@chakra-ui/react'
import {useState } from "react"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`

const Title = styled.h1`
  margin: 0;
  font-size: 4rem;
  line-height: 1.15;
  text-align: center;
  a {
    color: #0070f3;
    text-decoration: none;
  }
  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
`

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
`

const Code = styled.code<{ bgColor: string }>`
  padding: 0.75rem;
  font-family: Menlo, 'Monaco, Lucida Console', 'Liberation Mono',
    'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace;
  font-size: 1.1rem;
  background: ${(props) => props.bgColor};
  border-radius: 5px;
`

const Grid = styled.div`
  display: grid;
  place-items: auto;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(1, 50px);
`

const Griditem = styled.div`
  padding: 3px;
  border: 1px solid #eaeaea;
`

const Frame = styled.div`
  margin: auto;
  position: absolute;
  width: 400px;
  height: 400px;
  border: 8px #000000;
  background-color: #19542a;
`

const Player = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #ffffff;
`

const CPU = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #000000;
`
const Restart = styled.button`
  position: absolute;
  top: 10%;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 10px;
`

const Rock = styled.div`
  position: absolute;
  margin: auto;
  width: 400px;
  height: 400px;
  border: 8px #000000;
  background-color: #2e2e2e;
  opacity: 0.5;
`

const Card = styled.a`
  width: 45%;
  padding: 1.5rem;
  margin: 1rem;
  color: inherit;
  text-align: left;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }
  h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
`

const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`

const HomePage: NextPage = () => {

  //ボードを作る、0が何もない、 1がプレイヤーの白、2がNPCの黒
  //置けるグリッドの判定、同色の場所から見回し、突き当りまで足していき、反対色しか並んでない場所に設置可能
  //置いたとき、自分から見回し、突き当りまで足していき、同色があった場合ひっくり返す

  const initialval = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]

  const [board, setBoard] = useState (initialval)

  const [rocking, setRocking] = useState(false)

  const [debug, setDebug] = useState("debug")

  /*const lookaround = (y: number, x: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    const direction: number[][] = [[1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1], [0,1], [1,1]]
    const newdirection: number[][] = direction.filter((elem, ind) => {
      direction.map((content,index) => {//見回したい。indexを抽出してcontent[index]+0か1か2かの配列で返す
        if(newBoard[x+direction[index][0]][y+direction[index][1]] === 0){
          return [content[0], content[1], 0]
        }else if(newBoard[x+direction[index][0]][y+direction[index][1]] === 1){
          return [content[0], content[1], 1]
        }else if(newBoard[x+direction[index][0]][y+direction[index][1]] === 2){
          return [content[0], content[1], 2]
        }
      })
      return newBoard[x+direction[ind][0]][y+direction[ind][1]] === 1 || newBoard[x+direction[ind][0]][y+direction[ind][1]] === 0
    })
    return newdirection
  }*/

  const colorpicker = (y: number, x: number, direc: number[]) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    if (0 <= y + direc[0] && y + direc[0] <= 7 && 0 <= x + direc[1] && x + direc[1] <= 7) {
      if (newBoard[y+direc[0]][x+direc[1]] == 0) {
        return null
      }else if (newBoard[y][x] == newBoard[y+direc[0]][x+direc[1]]) {
        return true
      }else{
        return false
      }
    }else {
      return null
    }
  }

  const putjudge = (y:number, x: number, direc:number[], color:number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    newBoard[y][x] = color
    if (0 <= y + direc[0] && y + direc[0] <= 7 && 0 <= x + direc[1] && x + direc[1] <= 7) {
      if (newBoard[y+direc[0]][x+direc[1]] == 0) {
        return null
      }else if (newBoard[y][x] == newBoard[y+direc[0]][x+direc[1]]) {
        return true
      }else{
        return false
      }
    }else {
      return null
    }
  }

  const reversejudge = (y: number, x: number, color:number, board:number[][]) => {
    const direction: number[][] = [[1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1], [0,1], [1,1]]
    let result: number[][] = []
    if (board[y][x] === 0) {
      for (const direc of direction) {
        if (putjudge(y, x, direc, color) === false) {
          let temp = []
          temp.push([y+direc[0], x+direc[1]])
          let newy = y+direc[0]
          let newx = x+direc[1]
          while (colorpicker(newy, newx, direc) === true) {
            temp.push([newy+direc[0], newx+direc[1]])
            newy = newy + direc[0]
            newx = newx + direc[1]
          }
          if (colorpicker(newy, newx, direc) === false) {
            temp.map(content => result.push(content))
          }
        }
      }
    }
    const newresult: number[][] = reverse(result, board)
    if (JSON.stringify(board) != JSON.stringify(newresult)) {
      newresult[y][x] = color
    }
    
    return newresult
  }

  const reverse = (array: number[][], board: number[][]) => {//ひっくり返す
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    array.map((content, index) => {
      newBoard[content[0]][content[1]] = newBoard[content[0]][content[1]] == 1 ? 2 : 1
    })
    return newBoard
  }

  const ableput = (color:number, board:number[][]) => {//newBoardから置ける場所を抽出する
    const direction: number[][] = [[1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1], [0,1], [1,1]]
    let mycolor : number[][] = []
    board.map((y, ydex) => {y.map((x, xdex) => x === color && mycolor.push([ydex, xdex]))})
    
    let result: number[][] = []
    for (const array of mycolor) {
      const [y,x] = array
      for (const direc of direction) {
        if (colorpicker(y, x, direc) === false) {
          let temp = []
          temp.push([y+direc[0], x+direc[1]])
          let newy = y+direc[0]
          let newx = x+direc[1]
          while (colorpicker(newy, newx, direc) === true) {
            temp.push([newy+direc[0], newx+direc[1]])
            newy = newy + direc[0]
            newx = newx + direc[1]
          }
          if (colorpicker(newy, newx, direc) === null) {
            if (0 <= newy + direc[0] && newy + direc[0] <= 7 && 0 <= newx + direc[1] && newx + direc[1] <= 7) {
              result.push([newy + direc[0], newx + direc[1]])
            } 
          }
        }
      }
    }
    return result
    //return number[][]型のおける場所絶対座標
  }

  const getRandom = (array:number[][]) => {
    const max :number = array.length-1
    return array[Math.floor(Math.random() * max)]
  }

  const cpumove = (color:number, board:number[][]) => {
    const pickup :number[] = getRandom(ableput(color, board))
    if (pickup == undefined) {
      setRocking(false)
      return board
    }
    setRocking(false)
    const [y,x] = pickup
    const result : number[][] = reversejudge(y, x, color, board)
    return result
  }

  const playermove = (y: number, x: number, color:number, board:number[][]) => {
    setRocking(true)
    return reversejudge(y, x, color, board)
  }

  const push = (y: number, x: number, color:number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (JSON.stringify(reversejudge(y, x, color, board)) != JSON.stringify(newBoard)) {
      const turnBoard: number[][] = playermove(y, x, color, newBoard)
      setBoard(turnBoard)
      setTimeout(() => {
        setBoard(cpumove(color===1?2:1, turnBoard))
      }, 2000)
    }
  }

  /*const turn = async (color:number) => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    await setRocking(false)
    return cpumove(color===1?2:1, board)
  }*/

  /*const turntest = (y: number, x: number, color:number) => {
    setDebug("testing")
    setBoard(reversejudge(y, x, color, board))
    const newcolor :number = color===1?2:1
    const pickup :number[] = getRandom(ableput(newcolor, board))
    setDebug(JSON.stringify(pickup))
    const [newy,newx] = pickup
    return reversejudge(newy, newx, newcolor, board)
  }*/

  return (
    <Container>
      <Head>
        <title>Sample</title>
        <meta
          name="Sample"
          content="Sample"
        />
        <link
          rel="icon"
          href="favicon.ico"
        />
      </Head>
      <Main>
        <Restart onClick={() => {
            setBoard(initialval)
            setRocking(false)
          }}>Restart</Restart>
        <Frame>
            {board.map((row, y) => (
              <Grid key = {y}>
                {row.map((color, x) => (
                  <Griditem key={x} onClick={() => {push(y,x,1)}}>
                    {color === 1 && <Player></Player>}
                    {color === 2 && <CPU></CPU>}
                  </Griditem>
                ))}
              </Grid>
            ))}
        </Frame>
        {rocking === true && <Rock></Rock>}
      </Main>
    </Container>
  )
}

export default HomePage
