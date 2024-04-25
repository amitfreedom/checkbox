import { FlatList, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectionItems from './src/SelectionItems';

const App = () => {

  const [users, setUsers] = useState<[]>([]);
  const [showCheckBox, setShowCheckBox] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<[]>([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {
      console.log(data);
      data.map((item: { isSelected: boolean})=>{
        item.isSelected=false;
      });
      setUsers(data);

    })
  }

  useEffect(() => {
    getData();
  }, []);

  const onSelect = (ind:Number)=>{

    let temp = users;
    temp.map((item,index)=>{
      if(index==ind){
        item.isSelected = !item.isSelected;
      }
    });

    let tempData = [];
    temp.map((item)=>{
      tempData.push(item);
    });

    setUsers(tempData);
  }

  const selectAll = () =>{
    let temp = users;
    temp.map((item,index)=>{
        item.isSelected = true;
      
    });

    let tempData = [];
    temp.map((item)=>{
      tempData.push(item);
    });

    setUsers(tempData);

  }

  const clearAll = () =>{
    let temp = users;
    temp.map((item,index)=>{
        item.isSelected = false;
      
    });

    let tempData = [];
    temp.map((item)=>{
      tempData.push(item);
    });

    setUsers(tempData);
  }

  const getCount = ()=>{
    let temp = users;
    let tempData = [];
    temp.map((item,index)=>{
        if (item.isSelected) {
          tempData.push(item);
          selectedUsers.push(item.id);
        }
    });

    console.log(temp,"<<<<<<");
    

    return tempData?.length;
  }

  return (
    <SafeAreaView>
      {
        showCheckBox && 
        <View style={styles.selectAll}>
          <TouchableOpacity onPress={()=>{
            clearAll();
          }}>
            <Image source={require('./src/images/close.png')} style={{width:30,height:30,}}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            selectAll();
          }}>
            <Text style={{borderRadius:8,borderWidth:1,padding:10,marginLeft:20}}>Select All</Text>
          </TouchableOpacity>

          <Text style={{marginLeft:20,fontSize:14}}>{`Selected(${getCount()}) Items`}</Text>

        </View>
      }
      <View>
        <Text>{selectedUsers.toString()}</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item, index }) => {
          return (
            <SelectionItems item={item} onLongPress={() => {
                if(showCheckBox){
                  setShowCheckBox(false);
                  clearAll();
                }else{
                  setShowCheckBox(true);

                }
             }} onSelect={() => { 
              onSelect(index)
             }}
             isCheckbox={showCheckBox}
             />
          )
        }}

      />

    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  selectAll:{
    width:'100%',
    flexDirection:'row',
    height:60,
    marginTop:10,
    marginBottom:50,
    alignItems:'center',
    marginLeft:20

  }
})