import React, { useState, useEffect } from 'react'
import { Flex, Text } from '@mantine/core'
import { stringify } from 'querystring';

export default function Message(props: any) {
  const [align, setAlign] = useState("");
  const [color, setColor] = useState("");
  const [zone, setZone] = useState("");
  const [colorText, setColorText] = useState("");
  const txt = "jzjehjzahehjzahjehzajejahjhezajhkejkhejhjhezahjehjaze"

  useEffect(() => {
    if (props.self === 'me') {
      setAlign("end");
      setColor("green")
      setZone("end")
      setColorText("white")
    } else if (props.self === 'you') {
      setAlign("start");
      setColor("grey")
      setZone("start")
    }
  }, [])

  return (
    <>
    <Flex style={{
      backgroundColor: color,
      alignSelf: align,
      borderRadius: "5px",
      padding:"5px"
    }}>
      <Text color={"white"}>{ props.nickname[0].toUp + props.nickname[1]}</Text>
    </Flex>
    <Flex style={{
      width: "600px",
      height: "50px",
      backgroundColor: color,
      borderRadius: "15px",
      margin: "10px",
      padding: "15px",
      color: "white",
      alignSelf: align,
    }
    }>
      <Flex style={{
        width:"100%"
      }}>
        <Text >{props.txt}</Text>
      </Flex>
    </Flex >
    </>
  )
}