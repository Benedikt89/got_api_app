import * as React from "react";
import {Button, Dropdown, Layout, Menu} from "antd";
import './Header.css';
import {Link} from "react-router-dom";
import logo from '../../assets/logo512.png';
import headerBackground from '../../assets/background-indexed.png';

const {Header} = Layout;

interface I_Props {
}

class AppHeader extends React.Component<I_Props> {

  render() {

    return (
      <Header className="custom-header" style={{backgroundImage: `url(${headerBackground})`}}>
        <Link to={'/'}>
          <img src={logo} className="logo" alt={'logo'}/>
        </Link>

        <Link to='/tickets' key="2">
          <Button type="text" style={{color: '#fff'}}>
            SOME
          </Button>
        </Link>

        <Dropdown
          overlay={<Menu>
            <Menu.Item key="1">
              <Button type="text">
                <Link to='/login' key="2">
                  AAA2
                </Link>
              </Button>
            </Menu.Item>
          </Menu>}
        >
          <div style={{float: 'right'}}>
            qweq3
          </div>
        </Dropdown>
      </Header>
    )
  }
}

export default AppHeader;