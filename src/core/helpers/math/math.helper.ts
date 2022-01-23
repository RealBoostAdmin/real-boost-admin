export const getRandomNumber = async (min: number, max: number): Promise<number> => {
    return Math.random() * (max - min) + min;
};
