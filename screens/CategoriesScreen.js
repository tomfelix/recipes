import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTail';
import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = (props) => {
    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={(itemData) => {
                return (
                    <CategoryGridTile
                        title={itemData.item.title}
                        color={itemData.item.color}
                        onSelect={() => {
                            props.navigation.navigate('CategoryMeals',
                                { categoryId: itemData.item.id })
                        }} />
                )
            }}
        />
    )
}

CategoriesScreen.navigationOptions = navigationData => {
    return {
        headerLeft: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName="ios-menu" onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>)
        },
        title: 'Meal Categories',
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CategoriesScreen
