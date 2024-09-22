import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Layout from '../../components/Layout'
import { DIMENSIONS } from '../../utils/constants'
 const Splash = () => {
   
 
    return (
       <Layout style={{flex:1,backgroundColor:'#FFF'}}>
          <Text>Splash Page</Text>
       </Layout>
    )
}

export default Splash

const styles = StyleSheet.create({
    image: {
        height: DIMENSIONS.HEIGHT,
        width: DIMENSIONS.WIDTH
    }
})