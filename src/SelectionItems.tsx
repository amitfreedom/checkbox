import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';


type ItemType = {
    item: any;
    onLongPress: any;
    onSelect: any;
    isCheckbox: any;
}

const SelectionItems = ({ item, onLongPress, onSelect, isCheckbox }: ItemType) => {
    const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)

    return (
        <TouchableOpacity onLongPress={() => {
            onLongPress();
        }} style={styles.container}>
            <View>
                <Text style={styles.textTitle}>{item.username}</Text>
                <Text style={styles.textSubTitle}>{"Address: " + item.address.city}</Text>
                <Text style={styles.textSubTitle}>{"Email: " + item.email}</Text>
            </View>

            {
                isCheckbox && <CheckBox
                value={item.isSelected}
                onValueChange={(newValue) => onSelect(newValue)}
            />
            }
        </TouchableOpacity>
    )
}

export default SelectionItems

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 100,
        paddingBottom: 20,
        backgroundColor: '#f2f2f2',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        marginLeft: 10,

    },
    textSubTitle: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,

    }
})