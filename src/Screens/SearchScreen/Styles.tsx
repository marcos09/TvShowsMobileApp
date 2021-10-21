import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
	peopleList: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	loadingSpinnerContainer: {
		backgroundColor: '#212A2B',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	showItemRowContainer: {
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 15,
		flexDirection: 'row',
		paddingHorizontal: 5,
		paddingVertical: 10,
		marginHorizontal: 10,
		marginVertical: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	contentLayout: {
		marginBottom: 65,
	},
	imageContainer: {width: 100, height: 100},
	textShowTitle: {fontSize: 20, color: 'white'},
	showDetailContainer: {
		flex: 3,
		paddingLeft: 15,
	},
	personItem: {
		margin: 5,
		padding: 10,
		alignSelf: 'center',
		alignItems: 'center',
	},
	modalPersonDetail: {
		maxHeight: '75%',
		maxWidth: '95%',
		backgroundColor: '#212A2B',
		borderColor: 'white',
		borderWidth: 2,
	},
	resultContainer: {marginBottom: 65},
	personNameText: {fontSize: 15, color: 'white'},
	showRowContainer: {flex: 1},
	whiteColor: {color: 'white'},
	castCreditContainer: {
		marginHorizontal: 5,
		alignItems: 'center',
		backgroundColor: 'grey',
		padding: 10,
		borderRadius: 15,
		maxWidth: 150,
		height: 150,
	},
	castTitleText: {color: 'black', textAlign: 'center'},
	castCreditsListContainer: {marginTop: 10},
	personModalContainer: {alignItems: 'center'},
});
