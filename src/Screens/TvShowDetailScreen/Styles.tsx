import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
	header: {
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		flexDirection: 'row',
		paddingVertical: 10,
		justifyContent: 'space-between',
	},
	headerText: {
		color: '#E0DEC5',
	},
	summaryContainer: {
		borderBottomWidth: 2,
		borderColor: 'white',
		paddingVertical: 15,
		marginBottom: 10,
	},

	fieldTitleText: {
		fontSize: 20,
		color: 'white',
	},

	paragraphText: {
		color: 'white',
		textAlign: 'justify',
	},

	textEpisodeRowContainer: {
		marginLeft: 10,
		justifyContent: 'center',
	},

	episodeRowContainer: {
		flexDirection: 'row',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 5,
	},
	episodeTextDetail: {
		color: 'white',
		fontSize: 20,
	},
	whiteColor: {
		color: 'white',
	},
	showDataContainer: {
		marginBottom: 20,
	},
	genresContainer: {
		alignItems: 'center',
		padding: 10,
	},
	genresChipsContainer: {
		paddingHorizontal: 5,
	},
	seasonsContainer: {
		paddingHorizontal: 10,
	},
	genericDataContaioner: {
		marginHorizontal: 20,
	},
	summaryTextContainer: {
		paddingTop: 10,
	},
});
