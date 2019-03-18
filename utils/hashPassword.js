import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error(error); 
    }
}

const comparePassword = async (hashedPassword, password) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error(error); 
    }
}

export {
    hashPassword as default,
    comparePassword
};
