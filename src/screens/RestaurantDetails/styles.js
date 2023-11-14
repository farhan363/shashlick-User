import { StyleSheet} from 'react-native';
export default StyleSheet.create({
    page: {
        flex: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 4 / 3,
    },
    title: {
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 15,
        color: 'grey'
    },
    container: {
        margin: 10,
    },
    IconContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
    menutitle:{
        marginTop:20,
        fontSize:16,
        letterSpacing:0.6,
    },
    button: {
        backgroundColor: "black",
        marginTop: "auto",
        padding: 20,
        alignItems: "center",
        margin:10,
    },
    buttontext: {
        fontWeight: "600",
        fontSize: 18,
        color: 'white'
    }
});