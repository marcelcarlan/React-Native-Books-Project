import {apiURL} from '../core/api';
import React, {Component} from 'react';
import {Provider} from './context';
import {Alert, AsyncStorage} from "react-native"

class BookStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            books: null,
        };
    }
    componentDidMount() {
        this.loadBooksFromServer();
    }

    loadBooksFromServer = () => {
        this.retrieveDataFromAsyncStorage('token').then((token) => {
                this.setState({isLoading: true});
                fetch(`${apiURL}/book/all`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer '+ token
                    },
                })
                .then(response => response.json())
                .then(json => {
                    this.setState({isLoading: false, books: json});
                })
                .catch(error => {
                    this.setState({isLoading: false});
                });
        });
    };

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        );
    }

    retrieveDataFromAsyncStorage = async (key) => {
        return await AsyncStorage.getItem(key);
    };

}

export default BookStore;