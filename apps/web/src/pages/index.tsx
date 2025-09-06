import { Button, Layout, Typography, List, Space } from 'antd';
import { useQuery, gql } from '@apollo/client';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const PROJECTS = gql`
  query Projects {
    projects { id title excerpt updatedAt }
  }
`;

export default function Home() {
  const { data } = useQuery(PROJECTS);
  return (
    <Layout>
      <Header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Title level={3} style={{color:'#fff', margin:0}}>Desmond O'Leary</Title>
        <Space>
          <Button icon={<GithubOutlined />} href="https://github.com" target="_blank">GitHub</Button>
          <Button icon={<LinkedinOutlined />} href="https://linkedin.com" target="_blank" type="primary">LinkedIn</Button>
        </Space>
      </Header>
      <Content style={{padding: '48px 24px', maxWidth: 960, margin: '0 auto'}}>
        <Title>Hey, I'm Des</Title>
        <Paragraph>Result‑oriented engineer building scalable systems.</Paragraph>
        <Button type="primary" size="large" href="#projects">Projects</Button>
        <div id="projects" style={{marginTop: 32}}>
          <Title level={3}>Projects</Title>
          <List
            bordered
            dataSource={data?.projects ?? []}
            renderItem={(p:any) => (
              <List.Item>
                <List.Item.Meta title={p.title} description={p.excerpt} />
              </List.Item>
            )}
          />
        </div>
      </Content>
      <Footer style={{textAlign:'center'}}>© {new Date().getFullYear()} Des O'Leary</Footer>
    </Layout>
  );
}
