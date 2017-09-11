/* eslint-disable */ // TODO Fix when page is completed
import * as React from 'react';
import { connect } from 'react-redux';

import { getSession } from '../../../reducers/authentication';
import { savePassword } from '../../../reducers/account';

export interface IUserSettingsProps {
  account: any;
  getSession: Function;
}

export interface IUserSettingsState {
  account: any;
  firstPassword: string;
  secondPassword: string;
}

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  constructor(props) {
    super(props);
    this.state = {
      account: props.account,
      firstPassword: null,
      secondPassword: null
    };
  }

  componentDidMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      account: nextProps.account
    });
  }

  setFirstAccountPassword = event => {
    this.setState({
      firstPassword: event.target.value
    });
  }

  setSecondAccountPassword = event => {
    this.setState({
      secondPassword: event.target.value
    });
  }

  savePassword = event => {
    if (this.state.firstPassword === this.state.secondPassword) {
      savePassword(this.state.firstPassword);
    }
    event.preventDefault();
  }

  render() {
    const { account } = this.state;
    return (
      <div className="well">
        <div>
          <h2>Password for [{account.login}]</h2>
        </div>
        <form>
          <div className="form-group">
            <label className="control-label" >New password</label>
            <input type="password" className="form-control" id="firstName" name="firstName" placeholder="New password"
                   onChange={this.setFirstAccountPassword}/>
            <label className="control-label" >New password confirmation</label>
            <input type="password" className="form-control" id="lastName" name="lastName" placeholder="Confirm the new password"
                   onChange={this.setSecondAccountPassword}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.savePassword} >Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, savePassword };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
