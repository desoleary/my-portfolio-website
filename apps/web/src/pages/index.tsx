import { Layout } from 'antd';
import { AppHeader } from '@components/layout/AppHeader';
import { AppFooter } from '@components/layout/AppFooter';
import { Hero } from '@components/hero/Hero';
import { ProjectsSection } from '@components/projects/ProjectsSection';

const { Content } = Layout;

export default function Home() {
    return (
        <Layout>
            <AppHeader />
            <Content>
                <Hero />
                <ProjectsSection />
            </Content>
            <AppFooter />
        </Layout>
    );
}