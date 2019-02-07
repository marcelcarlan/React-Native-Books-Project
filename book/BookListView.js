import React, {Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/FontAwesome';


const theme = getTheme();

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        height: 125,
        backgroundColor: '#2980b6',

    },
    title: {

        top: 40,
        left: 80,
        right: 10,
        fontSize: 24,
    },
    image: {
        height: 80,
    },
    action: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
    },
    rating: {
        position: 'absolute',
        top: 55,
        left: 10,
        color: 'white',
        fontSize:35,
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0)',
    },
});

export class BookListView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[theme.cardStyle, styles.card]}>
                <Text style={[theme.cardActionStyle, styles.action]}>{this.props.book.author}</Text>
                <Text style={styles.rating}>{this.props.book.rating}</Text>
                <Text style={[theme.cardTitleStyle, styles.title]}>{this.props.book.title}</Text>
            </View>
        );
    }

}
