import { Typography, Button } from 'antd'

import { MouseScroll } from './MouseScroll'

const { Title, Paragraph } = Typography

export function Hero() {
  return (
    <section className='hero-bg'>
      <div className='container' style={{ paddingTop: 72, paddingBottom: 64 }}>
        <Title style={{ fontSize: 44, marginBottom: 12 }}>Hey, I&apos;m Des</Title>
        <Paragraph style={{ maxWidth: 720, fontSize: 16, opacity: 0.85 }}>
          Result-oriented engineer building scalable systems.
        </Paragraph>
        <Button type='primary' size='large' href='#projects'>
          Projects
        </Button>
        <MouseScroll />
      </div>
    </section>
  )
}
