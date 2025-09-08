import { useQuery } from '@apollo/client'
import { List, Typography, Card, Empty } from 'antd'

import { PROJECTS } from '@graphql/client/queries'

type Project = {
  id: string
  title: string
  excerpt?: string | null
  updatedAt?: string | null
}

const { Title } = Typography

export function ProjectsSection() {
  const { data, loading } = useQuery(PROJECTS)

  const items = data?.projects ?? []

  return (
    <section id='projects'>
      <div className='container' style={{ paddingTop: 40, paddingBottom: 64 }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Projects
        </Title>

        {items.length === 0 ? (
          <Card>
            <Empty description='No data' />
          </Card>
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
            loading={loading}
            dataSource={items}
            renderItem={(p: Project) => (
              <List.Item>
                <Card hoverable>
                  <Card.Meta title={p.title} description={p.excerpt} />
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </section>
  )
}
