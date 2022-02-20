const user = require('../model/user');

const createUser = async (req, res) => {
    try {
        const userInstance = await user.create({
            name: req.body.name,
            phone_number: req.body.phone_number,
        });
        res.json({
            status: 'success',
            message: 'User created successfully',
            data: userInstance,
        });
    } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        res.json({ error: error.message });
    }
};

const generateOTP = async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
        const userInstance = await user.findOne({
            phone_number: req.body.phone_number,
        });
        if (!userInstance)
            throw new Error(
                'User not found or phone number might now be registered'
            );
        const dbRes = await user.update(
            {
                otp: otp,
                otp_expiration_date: new Date(new Date().getTime() + 5 * 60000),
            },
            {
                where: { phone_number: req.body.phone_number },
            }
        );
        if (dbRes[0] === 0)
            throw new Error(
                'User not found or phone number might now be registered'
            );
        res.json({ status: 'success', message: 'OTP Generated!', otp: otp });
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const dbres = await user.findOne({
            where: {
                id: req.params.user_id,
                otp: req.params.otp,
            },
            raw: true,
        });

        if (dbres) throw new Error('OTP not verified');
        const isExpired =
            new Date(dbres.otp_expiration_date).getTime() <
            new Date().getTime();
        if (isExpired) throw new Error('OTP Expired!');
        res.json({ status: 'success', message: 'OTP Verified!', data: dbres });
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
};

module.exports = {
    createUser,
    generateOTP,
    verifyOTP,
};
