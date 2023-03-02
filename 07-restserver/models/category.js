const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: { type: String, required: [true, 'The name is required'] },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La password es obligatoria'] },
    img: { type: String },
    role: { type: String, required: true, enum: ['ADMIN', 'USER'] },
    status: { type: Boolean, default: true, required: [true, 'Status is required'] },
    User: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

CategorySchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Category', CategorySchema);