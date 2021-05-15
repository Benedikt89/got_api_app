import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router";
import {connect} from "react-redux";
import {selectErrorByKey, selectFetchingByKey} from "./redux/app/selectors";
import {AppStateType} from "./redux/store";
import {fetchData} from "./redux/data/actions";
import AppHeader from "./components/Header/Header";
import ProtectedRoute from "./components/common/ProtectedRoute";
import {DataType, PaginatorProps} from "./types/data-types";

interface I_props {}

interface I_connectedProps {
  error: { message: string } | null
  isFetching: boolean,
}

interface I_dispatchedProps {
  fetchData: (dataType: DataType, paginatorProps?: PaginatorProps) => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps {}

interface I_MainState {
  mounted: boolean
}

class Main extends Component<I_MainProps, I_MainState> {
  constructor(props: I_MainProps) {
    super(props);
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    console.log('AAAAAAAAAAAAAA')
    this.props.fetchData('books');
    this.props.fetchData('characters');

  }

  render() {
    const {} = this.props;
    return (
      <div className={"main-wrapper"}>
        <main>
          <AppHeader />
          <div className={"content-wrapper"}>
            <Switch>
              <Route exact path="/"
                     render={() => <Redirect to={"/tickets"}/>}/>

              <ProtectedRoute
                path="/tickets"
                component={() => (
                  <div>AAAAAAAAAA</div>
                )}
              />

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
    isFetching: selectFetchingByKey(state, 'fetchTickets'),
  }
};

let ComposedComponent = connect(
  mapStateToProps, {fetchData}
)(Main);

export default ComposedComponent;