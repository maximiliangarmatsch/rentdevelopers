import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: state.token + action.payload
            };
        case 'DELETE_TOKEN':
            return {
                ...state,
                token: ''
            };
        case 'SET_USERNAME':
            return {
                ...state,
                username: state.username + action.payload
            };
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        token: '',
        username: '',
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
