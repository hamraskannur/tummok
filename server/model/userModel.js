    import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[A-Za-z\s]+$/,
    },
    emailAddress: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password must contain at least 8 characters with at least one uppercase letter and one digit.',
        },
    },
    phoneNumber: {
        type: Number,
        match: /^\d{10}$/,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
      },
});

export const userModel = mongoose.model('User', userSchema);