import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema({
     employeName: { type: "String", required: true },
     department: { type: "String", unique: true, required: true },
     salary: { type: "String", required: true },
}, { timestamps: true })

const UserInfo = mongoose.model("UserInfo", userSchema, "userInfo");

export default UserInfo;