import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {TvShow} from '../../Types/TvShowType';
import {EMPTY_IMAGE_URL} from '../../Utils/Constants';
import {styles} from './Styles';

interface TvShowCardPropsInterface {
	item: TvShow;
	onPress: () => void;
	active?: boolean;
	activeIconName?: string;
	inactiveIconName?: string;
	onPressAction?: (item: TvShow) => void;
}

export const TvShowCard: React.FC<TvShowCardPropsInterface> = ({
	item,
	onPress,
	active,
	activeIconName = 'heart',
	inactiveIconName = 'heart',
	onPressAction,
}) => {
	return (
		<View style={{position: 'relative'}}>
			<TouchableOpacity onPress={onPress}>
				<FastImage
					source={{
						uri: item.image ? item.image.medium : EMPTY_IMAGE_URL,
						priority: FastImage.priority.high,
					}}
					style={{
						width: Dimensions.get('window').width / 3,
						height: 200,
					}}
					resizeMode={FastImage.resizeMode.stretch}
				/>
			</TouchableOpacity>
			{onPressAction && (
				<View style={styles.actionCardButtonContainer}>
					<TouchableOpacity onPress={() => onPressAction(item)}>
						<Icon
							name={active ? activeIconName : inactiveIconName}
							color={active ? 'red' : '#E0DEC5'}
							size={25}
							type='antdesign'
							tvParallaxProperties={undefined}
						/>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};
