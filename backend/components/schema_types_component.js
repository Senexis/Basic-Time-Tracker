const ColorSchemaType = {
    type: String,
    default: () => {
        const colors = [
            '#ea8f8f', // Red 300
            '#f381a7', // Pink 300
            '#c786d3', // Purple 300
            '#aa90d7', // Deep Purple 300
            '#939ed5', // Indigo 300
            '#83c3f7', // Blue 300
            '#72cff8', // Light Blue 300
            '#70d9e7', // Cyan 300
            '#70c4bc', // Teal 300
            '#9ad29c', // Green 300
            '#bedd9a', // Light Green 300
            '#e3eb90', // Lime 300
            '#fff391', // Yellow 300
            '#ffdd72', // Amber 300
            '#ffc570', // Orange 300
            '#ffa183'  // Deep Orange 300
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    },
    validate: {
        message: 'Color field value is invalid.',
        validator: (value, callback) => {
            const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            return colorRegex.test(value);
        }
    }
};

module.exports = {
    Color: ColorSchemaType
};