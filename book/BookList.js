import {Consumer} from './context';
import React, {Component} from 'react';
import {ScrollView, ActivityIndicator, View, Text, StyleSheet, AsyncStorage} from 'react-native'
import {BookListView} from "./BookListView";


const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    activityIndicator: {
        height: 50
    },
});

export class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
    render() {
        const {navigate} = this.props.navigation;
        return (

            <Consumer>
                {({isLoading, books}) => (
                    <View style={{flex:1}}>
                        <ScrollView style={styles.content}>
                            <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>
                            {books && books.map(book =>
                                <BookListView book={book}/>
                            )}
                        </ScrollView>
                    </View>
                )}
            </Consumer>
        );
    }
    openDetailedMovie = (navigate, book) => {
        navigate('EditBookScreen', {'book': book});
    };




}


