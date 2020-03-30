import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import CategoriesScreen from '../screens/CategoriesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import Colors from '../constants/Colors'

const defaultStackNavigatorOptions = {
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: 'open-sans'
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
},
    { defaultNavigationOptions: defaultStackNavigatorOptions }
);

const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
}
)

const tabNavigatorConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites'
        }
    }
};

const mealsFavoritesTabNavigator =
    Platform.OS === 'android' ?
        createMaterialBottomTabNavigator(tabNavigatorConfig, {
            activeColor: 'white',
            shifting: true
        })
        :
        createBottomTabNavigator(tabNavigatorConfig, {
            tabBarOptions: {
                activeTintColor: Colors.accentColor,
                labelStyle: {
                    fontFamily: 'open-sans'
                }
            }
        });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
    {
        defaultNavigationOptions: defaultStackNavigatorOptions
    })

const MainNavigator = createDrawerNavigator({
    MealsFavorites: {
        screen: mealsFavoritesTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor
    }
}
)

export default createAppContainer(MainNavigator);
