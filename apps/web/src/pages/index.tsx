import { Layout } from 'antd'

import { Hero } from '@components/hero/Hero'
import { AppFooter } from '@components/layout/AppFooter'
import { AppHeader } from '@components/layout/AppHeader'
import { ProjectsSection } from '@components/projects/ProjectsSection'

const { Content } = Layout

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content>
        <Hero />
        <ProjectsSection />
      </Content>
      <AppFooter />
    </Layout>
  )
}
