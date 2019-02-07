import React, {Component} from 'react';
import BookStore from "./BookStore";
import {BookList} from "./BookList";


export class BookListWrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BookStore style={{backgroundColor:'#2c3e50'}} >
                <BookList {...this.props}/>
            </BookStore>
        )
    }

    componentDidMount(): void {
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.forceUpdate();
        });
    }
}

