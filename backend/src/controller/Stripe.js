const { formatError } = require('../helpers/formatError');
const { getUserId } = require('../helpers/jwt');
const Class = require('../model/Class');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.registerClassStripe = async (req, res) => {
    const student_id = getUserId(req.cookies.jwt);
    const { course_id } = req.body;

    try {
        const course = await Class.findOne({
            _id: course_id,
            $expr: { $lt: ['$booked_seat', '$max_seat'] }
        });

        if (!course) {
            return res.status(400).json(formatError({ message: 'Cannot register, class is full or does not exist' }));
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: course.price * 100, // Stripe expects the amount in cents
            currency: 'thb', // Adjust the currency as needed
            payment_method_types: ['card'],
            metadata: {
                course_id: course._id.toString(),
                student_id: student_id
            }
        });

        res.status(200).json({ 
            clientSecret: paymentIntent.client_secret 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(formatError({ message: 'Server error' }));
    }
}

module.exports.confirmRegistrationStripe = async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            const { course_id, student_id } = paymentIntent.metadata;

            const course = await Class.findOneAndUpdate(
                {
                    _id: course_id,
                    $expr: { $lt: ['$booked_seat', '$max_seat'] }
                },
                {
                    $push: { students: student_id },
                    $inc: { booked_seat: 1 }
                },
                { new: true }
            );

            if (!course) {
                return res.status(400).json(formatError({ message: 'Cannot register, class is full or does not exist' }));
            }

            res.status(200).json(course);
        } else {
            res.status(400).json(formatError({ message: 'Payment not completed' }));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(formatError({ message: 'Server error' }));
    }
}