import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import MealItem from './MealItem'

const MealsList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    return (
        <View style={styles.screen} >
            <FlatList style={styles.categoryMealsList} data={props.listData} renderItem={({ item }) => {
                return (
                    <MealItem
                        mealData={{ ...item }}
                        onSelect={() => {
                            props.navigation.navigate('MealDetail',
                                {
                                    mealId: item.id,
                                    mealTitle: item.title,
                                    isFavorite: favoriteMeals.some(meal => meal.id === item.id)
                                })
                        }}
                    />
                )
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    categoryMealsList: {
        width: '100%',

    }
});

export default MealsList
