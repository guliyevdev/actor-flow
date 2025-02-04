import {
    Dropdown,
    Flex,
    FloatButton,
    Layout,
    MenuProps,
    message,
    theme,
    Tooltip,
    Switch,
    Menu,
  } from 'antd';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { ReactNode, useEffect, useRef, useState } from 'react';
  import {
    LogoutOutlined,
    QuestionOutlined,
    SettingOutlined,
    UserOutlined,
    MoonOutlined,
    SunOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
  import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
  } from 'react-transition-group';
  import { useMediaQuery } from 'react-responsive';
  import { NProgress } from '../../components/index.ts';
  import { PATH_LANDING } from '../../constants/index.ts';
  import { useSelector, useDispatch } from 'react-redux';
  import { toggleTheme } from '../../redux/theme/themeSlice.ts';
import { Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
  
  const { Content } = Layout;
  
  type AppLayoutProps = {
    children: ReactNode;
  };
  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '90vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    backgroundColor: "white"
};
  
  export const DefaultProcess = ({ children }: AppLayoutProps) => {
    const {
      token: { borderRadius },
    } = theme.useToken();
    const isMobile = useMediaQuery({ maxWidth: 769 });
    const [collapsed, setCollapsed] = useState(true);
    const [navFill, setNavFill] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const nodeRef = useRef(null);
    const floatBtnRef = useRef(null);
    const dispatch = useDispatch();
    const { mytheme } = useSelector((state: RootState) => state.theme);
    const items: MenuProps['items'] = [
      {
        key: 'user-profile-link',
        label: 'profile',
        icon: <UserOutlined />,
      },
      {
        key: 'user-settings-link',
        label: 'settings',
        icon: <SettingOutlined />,
      },
      {
        key: 'user-help-link',
        label: 'help center',
        icon: <QuestionOutlined />,
      },
      {
        type: 'divider',
      },
      {
        key: 'user-logout-link',
        label: 'logout',
        icon: <LogoutOutlined />,
        danger: true,
        onClick: () => {
          message.open({
            type: 'loading',
            content: 'signing you out',
          });
  
          setTimeout(() => {
            navigate(PATH_LANDING.root);
          }, 1000);
        },
      },
    ];
  
    useEffect(() => {
      setCollapsed(isMobile);
    }, [isMobile]);
  
    useEffect(() => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 5) {
          setNavFill(true);
        } else {
          setNavFill(false);
        }
      });
    }, []);
  
    return (
      <>
        <NProgress isAnimating={isLoading} key={location.key} />
        <Layout>
              <Header
                      style={{
                          position: 'sticky',
                          top: 0,
                          zIndex: 1,
                          width: '100%',
                          height: '8vh',
                          display: 'flex',
                          alignItems: 'center',
                          background: '#fff',
                          justifyContent: 'space-between',
                      }}>
                         
                      <Flex align="center" gap="small">
                        <p>Logo</p>
                      </Flex>   
                      <Flex align="center" gap="small">
                          <Tooltip title="Theme">
                              <Switch
                              className="hidden sm:inline py-1"
                              checkedChildren={<MoonOutlined />}
                              unCheckedChildren={<SunOutlined />}
                              checked={mytheme === 'light' ? true : false}
                              onClick={() => dispatch(toggleTheme())}
                              />
                          </Tooltip>
                          <Dropdown menu={{ items }} trigger={['click']}>
                              <Flex>
                                  <img
                                      src="/me.jpg"
                                      alt="user profile photo"
                                      height={36}
                                      width={36}
                                      style={{ borderRadius, objectFit: 'cover' }}
                                  />
                              </Flex>
                          </Dropdown>
                      </Flex>
                  </Header>
              <Layout>
                  <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={siderStyle}>
                      <div className="demo-logo-vertical" />
                      <Menu
                          theme="light"
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          items={[
                              {
                                  key: '1',
                                  icon: <UserOutlined />,
                                  label: 'nav 1',
                              },
                              {
                                  key: '2',
                                  icon: <VideoCameraOutlined />,
                                  label: 'nav 2',
                              },
                              {
                                  key: '3',
                                  icon: <UploadOutlined />,
                                  label: 'nav 3',
                              },
                          ]}
                      />
                  </Sider>
                  <Content
              style={{
                // margin: `0 0 0 ${collapsed ? 0 : '200px'}`,
                // background: '#ebedf0',
                borderRadius: collapsed ? 0 : borderRadius,
                transition: 'all .25s',
              //   padding: '24px 32px',
              //   minHeight: 360,
                // padding: 24,
                minHeight: '92vh',
                background: '#d2e0e5',
              //   borderRadius: borderRadiusLG,
              }}
            >
              <TransitionGroup>
                <SwitchTransition>
                  <CSSTransition
                    key={`css-transition-${location.key}`}
                    nodeRef={nodeRef}
                    onEnter={() => {
                      setIsLoading(true);
                    }}
                    onEntered={() => {
                      setIsLoading(false);
                    }}
                    timeout={300}
                    classNames="bottom-to-top"
                    unmountOnExit
                  >
                    {() => (
                      <div ref={nodeRef} style={{ background: 'none' }}>
                        {children}
                      </div>
                    )}
                  </CSSTransition>
                </SwitchTransition>
              </TransitionGroup>
              <div ref={floatBtnRef}>
                <FloatButton.BackTop />
              </div>
            </Content>
              </Layout>
          </Layout>
      </>
    );
  };
  