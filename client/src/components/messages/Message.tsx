import React, { useState, useEffect } from 'react'
import { Flex, Text } from '@mantine/core'

export default function Message(props: any) {
  const [align, setAlign] = useState("");
  const [color, setColor] = useState("");
  const [zone, setZone] = useState("");
  const txt = "jzjehjzahehjzahjehzajejahjhezajhkejkhejhjhezahjehjaze"

  useEffect(() => {
    if (props.self === 'me') {
      setAlign("end");
      setColor("green")
      setZone("end")
    } else if (props.self === 'you') {
      setAlign("start");
      setColor("lightblue")
      setZone("start")
    }
  }, [])

  return (
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
  )
}