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
	episodeRowContainer: {
		flexDirection: 'row',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 5,
	},
	textEpisodeRowContainer: {
		marginLeft: 10,
		justifyContent: 'center',
	},
	whiteColor: {
		color: 'white',
	},
	episodeTextDetail: {
		color: 'white',
		fontSize: 20,
	},
});
