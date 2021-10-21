import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const FullscreenContentLayout = ({children, loading = false}) => {
	return (
		<View>
			{loading ? (
				<View style={styles.loadingSpinnerContainer}>
					<ActivityIndicator size='large' />
				</View>
			) : (
				<View style={styles.container}>{children}</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#212A2B',
		height: '100%',
	},
	loadingSpinnerContainer: {
		backgroundColor: '#212A2B',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export {FullscreenContentLayout};
