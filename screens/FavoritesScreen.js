import React from 'react'
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { View, Text, StyleSheet } from 'react-native'

import MealsList from '../components/MealsList';
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText';

const FavoritesScreen = (props) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    if (favoriteMeals.length === 0 || !favoriteMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>Add some favorites!</DefaultText>
            </View>
        )
    }
    return (
        <MealsList listData={favoriteMeals} navigation={props.navigation} />
    )
}

FavoritesScreen.navigationOptions = navigationData => {
    return {
        headerLeft: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName="ios-menu" onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>)
        },
        title: 'Your Favorites',
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen
