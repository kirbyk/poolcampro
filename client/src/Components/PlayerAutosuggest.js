import React from 'react';
import Button from 'material-ui/Button';
import { css } from 'emotion';
import TextField from 'material-ui/TextField';
import axios from 'axios'
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from 'material-ui/styles';

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

export default class PlayerAutosuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      value: '',
    };
  }

  componentDidMount() {
    axios.get('http://kirby.ngrok.io/players/suggestions')
      .then(response => {
        this.setState({
          suggestions: response.data.suggestions
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  renderInput(inputProps) {
    const { autoFocus, value, id, label } = inputProps;

    return (
      <TextField
        autoFocus={autoFocus}
        margin="dense"
        value={value}
        id={id}
        label={label}
        type="text"
        fullWidth
      />
    );
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={index} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }

  render() {
    return (
      <Autosuggest
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          autoFocus: true,
          id: 'player1',
          label: 'Player 1',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}
