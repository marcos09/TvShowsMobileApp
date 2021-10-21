function cardinalToOrdinal(value: number): string {
	if (value < 10 || value > 20) {
		const mod = value % 10;
		switch (mod) {
		case 1:
				return value + 'st';
		case 2:
			return value + 'nd';
		case 3:
				return value + 'rd';
			default:
				return value + 'th';
		}
	}
	return value + 'th';
}

export {cardinalToOrdinal};
