import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Layout, Typography, Space, Button } from 'antd'

const { Header } = Layout
const { Title } = Typography

export function AppHeader() {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title level={3} style={{ color: '#fff', margin: 0 }}>
        Desmond O&apos;Leary
      </Title>
      <Space>
        <Button icon={<GithubOutlined />} href='https://github.com' target='_blank'>
          GitHub
        </Button>
        <Button icon={<LinkedinOutlined />} href='https://linkedin.com' target='_blank' type='primary'>
          LinkedIn
        </Button>
      </Space>
    </Header>
  )
}
