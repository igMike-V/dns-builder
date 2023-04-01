import { Table, Container, Popover, OverlayTrigger } from 'react-bootstrap'
import { ClipboardCheck } from 'react-bootstrap-icons'
import { copyContent } from '../utilities/utilities'

export const DnsSingle = ({ recordContent, ip }) => {
  const { record, type, hostName, value, ttl, description } = recordContent
  
 

  const infoPopover = (
    <Popover id='popover-basic'>
      <Popover.Body>
        {description}
      </Popover.Body>
    </Popover>
  )

  
  return (
    <Container className='p-5 mb-4 bg-light rounded'>
      <div className='heading' style={{display: 'flex', alignItems: 'center', gap: '.5em'}}>
        <h2>{record}</h2>
        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={infoPopover}
        >
          <div
            className='rounded-circle bg-dark text-light'
            style={{
            width: '18px',
            height: '18px',
            textAlign: 'center',
            fontSize: '.7em',
            marginTop: '-2px',
            cursor: 'pointer'
          }}>
            ?
            </div>
        </OverlayTrigger>
      </div>
      <Table >
        <thead>
          <tr>
            <th>Host / Name:</th>
            <th>Value:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='align-middle'>{hostName}</td>
            <td className='align-middle text-break'>
              <div style={{
                cursor: "pointer",
                display: "flex",
                gap: ".25em",
                alignContent: "center",
                maxWidth: "90%"
              }} className='icon-link'
                onClick={() => copyContent(value)}>
                
                {value ? value : ip}

                <ClipboardCheck width={'10%'}/>
              </div>
            </td>
          </tr>

        </tbody>
      </Table>
    </Container>
  )

}