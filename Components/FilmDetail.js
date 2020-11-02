import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'


class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }

    }


    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                            <Image
                                style={styles.image}
                                source={{uri: getImageFromApi(film.backdrop_path)}}
                            />
                            <View style={styles.content_container}>

                                <View style={styles.title_container}>
                                <Text style={styles.title_text}>{film.title}</Text>
                                </View>

                                <View style={styles.description_container}>
                                <Text style={styles.description_text}>{film.overview}</Text>
                                </View>

                                <View style={styles.details_container}>
                                <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                                <Text style={styles.vote_text}>Note : {film.vote_average}/10</Text>
                                <Text style={styles.vote_text}>Nombres de votes : {film.vote_count}</Text>
                                <Text style={styles.vote_text}>Budget : {film.budget}</Text>
                                {/*<Text style={styles.vote_text}>Genre(s) : {film.genres}</Text>
                                <Text style={styles.vote_text}>Compagnie(s) : {film.production_companies}</Text>
                                */}
                                </View>
                            </View>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color='#808080' />
                </View>
            )
        }
    }



    render () {
        const idFilm = this.props.navigation.state.params.idFilm
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },




    
    scrollview_container: {
        flex: 1,
        width: "100%"
    },

    image: {

        height: 200,
        margin: 5,
        backgroundColor: 'gray'
      },
      content_container: {
        flex: 1,
        margin: 5
      },
      title_container: {
        flex: 1,
        alignItems: "center"
      },
      title_text: {
        fontWeight: 'bold',
        fontSize: 30
      },
      vote_text: {

      },
      description_container: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20
        
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666',
        fontSize: 20

      },
      date_container: {
        flex: 1
      },
      date_text: {
        fontSize: 14
      }
})

export default FilmDetail