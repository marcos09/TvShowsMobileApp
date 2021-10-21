import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './Styles';

interface RatingScoreProps {
	averageScore: number;
	maxScore: number;
}

const RaitingScore: React.FC<RatingScoreProps> = ({averageScore, maxScore}) => {
	return (
		<View style={styles.raitingContainer}>
			<View>
				<View>
					<Icon
						name='star'
						color='yellow'
						size={30}
						tvParallaxProperties={undefined}
					/>
					<Text style={styles.textScore}>
						<Text style={styles.textYellowScore}>
							{averageScore.toFixed(1)}/
						</Text>
						{maxScore}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default RaitingScore;
