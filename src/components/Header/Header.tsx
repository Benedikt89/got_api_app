import * as React from "react";
import {Button, Layout} from "antd";
import './Header.css';
import {Link} from "react-router-dom";
import logo from '../../assets/logo512.png';
import headerBackground from '../../assets/background-indexed.png';
import {dataTypes} from "../../constants/api-url";

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

        {dataTypes.map((type, i) => <Link to={'/' + type} key={i}>
          <Button type="text" style={{color: '#fff'}}>
            {type}
          </Button>
        </Link>)}

      </Header>
    )
  }
}

export default AppHeader;