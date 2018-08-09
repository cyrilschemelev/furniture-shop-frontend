export const getImage = {
    methods: {
        getImage(image, imageWidth, imageHeight) {
            if (image !== null && Object.keys(image).length) {
                let heightRatio = 0.7203,
                    minHeight = parseInt(320 * heightRatio) + 1;
                if (imageWidth === undefined || imageWidth < 320 || isNaN(imageWidth)) {
                    imageWidth = 320;
                }
                if (imageHeight === undefined || imageHeight < minHeight || isNaN(imageHeight)) {
                    imageHeight = minHeight;
                }
                const matrix = [
                    {
                        width: 320,
                        size: 'xxs'
                    },
                    {
                        width: 361,
                        size: 'xs'
                    },
                    {
                        width: 570,
                        size: 'sm'
                    },
                    {
                        width: 820,
                        size: 'md'
                    },
                    {
                        width: 1070,
                        size: 'lg'
                    },
                    {
                        width: 1320,
                        size: 'xl'
                    },
                    {
                        width: 1441,
                        size: 'xxl'
                    },
                    {
                        width: 1920,
                        size: 'original'
                    }
                ];
                let widthArr = matrix.filter(rule => rule.width <= imageWidth * window.devicePixelRatio);
                let heightArr = matrix.filter(rule => {
                    let ruleHeight = rule.width * heightRatio;
                    return ruleHeight <= parseInt(imageHeight) * window.devicePixelRatio;
                });

                // let lastWidth = {};
                // let lastHeight = {};

                function getLast(arr) {
                    if (!!arr) {
                        return arr[arr.length - 1];
                    } else {
                        return matrix[0];
                    }
                }

                let lastWidth = getLast(widthArr);
                let lastHeight = getLast(heightArr);

                if (lastWidth !== undefined &&
                    lastHeight !== undefined) {
                    if (parseInt(lastWidth.width) > parseInt(lastHeight.width)) {
                        //debugger;
                        return image[lastWidth.size + '_url'];
                    } else {
                        //debugger;
                        return image[lastHeight.size + '_url'];
                    }
                } else {
                    return '';
                }
            }
        }
    }
};