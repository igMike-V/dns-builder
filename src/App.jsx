import { useState } from 'react'
import {DnsTemplate} from './components/DnsTemplate'
import { Container } from 'react-bootstrap'
import { MainForm } from './components/MainForm'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

function App() {

  const ip = urlParams.get('ip')

  if (!ip) {
    return (
      <Container>
        <MainForm />
      </Container>
    )
  }

  return (
    <Container>
        <DnsTemplate ipAddress={ip} />
    </Container>
  )
}

export default App
