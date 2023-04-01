import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { copyContent } from '../utilities/utilities'


export const MainForm = () => {
  const [inputs, setInputs] = useState({
    ip: '',
    domain:''
  })

  const handleCopy = () => {
    console.log(document.location.origin)
    copyContent(`${document.location.origin}/?ip=${inputs.ip}&domain=${inputs.domain}`)
  }

  const handleShow = () => {
    console.log(inputs)
  }

  const [ copied, setCopied] = useState(null)
  return (
    <Container className='p-5 mb-4 bg-light rounded'>
      <h1 className="connect">Get your site connected</h1>
      <p>type in your domain name and the ip address we supplied you to set connect to your application</p>
      <Form>
        <Form.Label>IP Address</Form.Label>
        <Form.Control type="text" name="ip" value={inputs.ip} onChange={(e) => setInputs({...inputs, ip: e.target.value}) } />
        <Form.Label>Domain Name</Form.Label>
        <Form.Control type="text" name="domain" value={inputs.domain} onChange={(e) => setInputs({...inputs, domain: e.target.value}) } />
        <Button onClick={handleShow}>Show Settings</Button>
        <Button variant="Secondary" onClick={handleCopy}>Copy Link</Button>
      </Form>
    </Container>
  )
}

