import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Input } from 'semantic-ui-react';
import { pokemonTable } from './pokemon-table.js';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

// TBD ---------------
// Reset button
// Checkboxes for generations to include in dropdowns
// Cookies
// CSS
// Firebase?

// ===========================================================================
// Individual pokemon class
// ===========================================================================
function PkmNickname(props) {
  const placeholderText = (props.currentPkm === ""
    ? "Pokemon #" + (1+props.pkmnumber)
    : props.currentPkm.charAt(0).toUpperCase() + props.currentPkm.slice(1)) + "'s Nickname";
  return (
    <Input 
      placeholder={placeholderText}
      inverted={false}
      value={props.currentNick}
      onChange={props.onChange}
    />
  );
}

// ===========================================================================
// Individual pokemon dropdown
// ===========================================================================
function PkmDropdown(props) {
  return (
    <Dropdown
      placeholder={"Select Pokemon #" + (1+props.pkmnumber)}
      search
      selection
      inline
      clearable
      lazyLoad={true}
      value={props.currentPkm}
      onChange={props.onChange}
      options={pokemonTable}
    />
  );
}

// ===========================================================================
// Individual pokemon class - dropdown and input
// ===========================================================================
function Pokemon(props) {
  return (
    <div>
      <PkmDropdown 
        pkmnumber={props.pkmnumber}
        currentPkm={props.currentPkm}
        onChange={props.onPkmChange}
      />
      <PkmNickname
        pkmnumber={props.pkmnumber}
        currentPkm={props.currentPkm}
        currentNick={props.currentNick}
        onChange={props.onNickChange}
      />
    </div>
  );
}

// ===========================================================================
// Individual party pokemon image
// ===========================================================================
function PartyMemberImage(props) {
  if (props.currentPkm === "") { return null; }
  const row = pokemonTable.find(line => line.value === props.currentPkm);
  return <img src={row.hires} alt={row.text} />;
}

// ===========================================================================
// Individual party pokemon nickname
// ===========================================================================
function PartyMemberNick(props) {
  if (props.currentNick === "") { return null; }
  return (
    <div className="pkm-nick-box">{props.currentNick}</div>
  );
}

// ===========================================================================
// Individual party pokemon 
// ===========================================================================
function PartyMember(props) {
  return (
    <div>
      <PartyMemberImage currentPkm={props.currentPkm} />
      <PartyMemberNick currentNick={props.currentNick} />
    </div>
  );
}

// ===========================================================================
// Pokemon party class
// ===========================================================================
class PkmParty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      party: Array(6).fill(""),
      nicks: Array(6).fill(""),
    };
  }

  changePkm(i, data) {
    const party = this.state.party.slice();
    party[i] = data.value;
    const nicks = this.state.nicks.slice();
    nicks[i] = "";
    this.setState({party: party, nicks: nicks});
  }

  changeNickname(i, data) {
    const nicks = this.state.nicks.slice();
    nicks[i] = data.value;
    this.setState({nicks: nicks});
  }

  selectPkm(i) {
    return (
      <Pokemon
        pkmnumber={i} 
        currentPkm={this.state.party[i]}
        currentNick={this.state.nicks[i]}
        onPkmChange={(event, data) => this.changePkm(i, data)}
        onNickChange={(event, data) => this.changeNickname(i, data)}
      />
    );
  }

  displayPkm(i) {
    return (
      <PartyMember 
        currentPkm={this.state.party[i]}
        currentNick={this.state.nicks[i]}
      />
    );
  }

  render() { return (
  <div>
    <div className="row">
      {this.selectPkm(0)}
      {this.selectPkm(1)}
      {this.selectPkm(2)}
      {this.selectPkm(3)}
      {this.selectPkm(4)}
      {this.selectPkm(5)}
    </div>

    <div className="pkm-grid-wrapper">
      <div className="square">{this.displayPkm(0)}</div>
      <div className="square">{this.displayPkm(1)}</div>
      <div className="square">{this.displayPkm(2)}</div>
      <div className="square">{this.displayPkm(3)}</div>
      <div className="square">{this.displayPkm(4)}</div>
      <div className="square">{this.displayPkm(5)}</div>
    </div>
  </div>
  )}
}

ReactDOM.render(
  <PkmParty />,
  document.getElementById('root')
);