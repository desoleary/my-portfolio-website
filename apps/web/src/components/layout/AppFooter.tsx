import { Layout } from 'antd'
const { Footer } = Layout

export function AppFooter() {
  return <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} Des O&apos;Leary</Footer>
}
