import { useState } from 'react'
import DnsTemplate from './components/dnsTemplate'
import { Container } from 'react-bootstrap'


function App() {

  return (
    <Container>
        <DnsTemplate ipAddress={"192.168.1.1"} />
    </Container>
  )
}

export default App
