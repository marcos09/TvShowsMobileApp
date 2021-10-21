import React from 'react';
import {FlatList, View, Text} from 'react-native';

import {styles} from './Styles';
import {TvShow} from '../../Types/TvShowType';

interface ScheduleComponentProps {
	show: TvShow;
}

export const ScheduleComponent: React.FC<ScheduleComponentProps> = ({show}) => {
	return (
		<View style={styles.scheduleContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.fieldTitleText}>Schedule</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
				}}>
				<View style={styles.timeTextContainer}>
					<Text style={styles.whiteColor}>
						Time: {show.schedule.time}
					</Text>
				</View>
				<View>
					<FlatList
						data={show.schedule.days}
						renderItem={({item}) => (
							<Text style={styles.whiteColor}>{item}</Text>
						)}
					/>
				</View>
			</View>
		</View>
	);
};
