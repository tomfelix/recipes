import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton';
import FilterSwitch from '../components/FilterSwitch';
import { setFilters } from '../store/actions/mealsActions';

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegeterian
        }
        dispatch(setFilters(appliedFilters))
        console.log(appliedFilters);

    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian, dispatch]
    )

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        })
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Filters / Restrictions</Text>
            <FilterSwitch label="Gluten-free" value={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label="Lactose-free" value={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label="Vegan" value={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label="Vegeterian" value={isVegeterian} onChange={newValue => setIsVegeterian(newValue)} />
        </View>
    )
}

FiltersScreen.navigationOptions = navigationData => {
    return {
        headerLeft: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName="ios-menu" onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>)
        },
        title: 'Filter Meals',
        headerRight: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="save" iconName="ios-save" onPress={navigationData.navigation.getParam('save')} />
            </HeaderButtons>)
        },
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FiltersScreen
