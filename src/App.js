import React from 'react';
import './App.css';
import zhCN from 'antd/es/locale/zh_CN';
import {Button, Checkbox, ConfigProvider, Form, Icon, Input, Radio, Typography} from "antd";
import enUS from 'antd/es/locale/en_US';
import i18n from "./util/i18nUtil";

const {Text} = Typography;

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      locale: zhCN,
      rememberMe: false,
      defaultLocale: true,
    }
  }
  changeLocale = (e) => {
    const localeValue = e.target.value;
    this.setState({
      locale: localeValue,
      defaultLocale: false,
    });
  };

  render() {

    i18n.init({
      currentLocale: this.state.locale.locale,
      locales: {
        [this.state.locale.locale]: require(`./locale/${this.state.locale.locale}.json`)
      }
    });
    const {getFieldDecorator} = this.props.form;
    return (
        <ConfigProvider locale={this.state.locale} className="App">
          <Radio.Group style={{
            float: 'right',
            marginRight: 10,
            padding: 20
          }} onChange={this.changeLocale}>
            <Radio.Button key={'zh-cn'} value={zhCN} checked={this.state.defaultLocale}>
              简体中文
            </Radio.Button>
            <Radio.Button key={'en-us'} value={enUS}>
              English
            </Radio.Button>
          </Radio.Group>
          <div style={{
            padding: '100px 0'
          }}>
            <Form onSubmit={(e) => {
              e.preventDefault();
              this.props.form.validateFields((err, values) => {
                if (!err) {
                  console.log(values)
                }
              });
            }} className='login-form'>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: i18n.get('prompt_input_username')}],
                })(
                    <Input
                        whitespace={'true'}
                        allowClear
                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder={i18n.get('prompt_input_username')}
                    />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: i18n.get('prompt_input_pwd') }],
                })(
                    <Input.Password
                        visibilityToggle
                        whitespace={'true'}
                        allowClear
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder={i18n.get('prompt_input_pwd')}
                    />,
                )}
              </Form.Item>
              {window.localStorage ?
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>{i18n.get('remember_me')}</Checkbox>)}
                    <span className='login-form-forgot'>
                        {i18n.get('forget_password')}
                    </span>
                    <br/>
                    <Button type='primary' disabled={this.state.loginBtnClicked} htmlType='submit' className='login-form-button'>
                      {i18n.get('login')}
                    </Button>
                  </Form.Item>
                  :
                  <Text>
                    {i18n.get('not_support_localStorage')}
                  </Text>
              }
            </Form>
          </div>
        </ConfigProvider>
    );
  }
}

export default Form.create({name: 'login_form'})(App);
