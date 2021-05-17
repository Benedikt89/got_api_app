import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router";
import {connect} from "react-redux";
import {selectErrorByKey, selectFetchingByKey} from "./redux/app/selectors";
import {AppStateType} from "./redux/store";
import AppHeader from "./components/Header/Header";
import {dataTypes} from "./constants/api-url";
import DataTable from "./components/Table/DataTableWrapper";
import DescriptionPage from "./components/DescriptionPage/DescriptionPage";

interface I_props {}

interface I_connectedProps {
  error: { message: string } | null
  isFetching: boolean,
}

interface I_dispatchedProps {}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps {}

interface I_MainState {}

class Main extends Component<I_MainProps, I_MainState> {
  constructor(props: I_MainProps) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={"main-wrapper"}>
        <main>
          <AppHeader />
          <div className={"content-wrapper"}>
            <Switch>
              <Route exact path="/"
                     render={() => <Redirect to={"/characters"}/>}/>

              {dataTypes.map(type => <Route
                exact path={`/${type}/:id?`}
                key={type}
                component={() => type === 'characters'
                  ? <DataTable _dataType={type} />
                  : <DescriptionPage _dataType={type} />}
              />)}

              <Route path="*" render={() => <div>Error 404</div>}/>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType): I_connectedProps => {
  return {
    error: selectErrorByKey(state, 'fetchTickets'),
    isFetching: selectFetchingByKey(state, 'initialiseApp'),
  }
};

let ComposedComponent = connect(
  mapStateToProps, {}
)(Main);

export default ComposedComponent;