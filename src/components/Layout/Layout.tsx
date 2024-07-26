import { Layout } from 'antd';
import React from 'react';
import AppHeader from '../Header/Header';

const { Content, Footer } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 50px', marginTop: 64, height: '100vh' }}>
        <div className='site-layout-content' style={{ padding: 24, minHeight: 380 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My App ©2024 Created by Me</Footer>
    </Layout>
  );
};

export default AppLayout;
