import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {LoginForm} from "./login/LoginForm";
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {BookListWrapper} from "./book/BookListWrapper";


const paramsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions;
        render() {
            const {navigation, ...otherProps} = this.props
            const {state: {params}} = navigation
            return <SomeComponent {...this.props} {...params} />
        }
    }
};

export const AppNavigation = createStackNavigator({
    LoginScreen: {screen:LoginForm},
    BookScreen:  {screen:paramsToProps(BookListWrapper)},
});

const AppContainer = createAppContainer(AppNavigation);

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <AppContainer/>
        );
    }
}


