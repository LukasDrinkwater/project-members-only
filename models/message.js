const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// timestand lets you use .createdAt and .updatedAt on the Schema variable
// when getting it from the db

// let doc = await User.create({ name: 'test' });
// console.log(doc.createdAt); // 2022-02-26T16:37:48.244Z
// console.log(doc.updatedAt); // 2022-02-26T16:37:48.244Z

const MessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// virtuals

MessageSchema.virtual("createdAtFormatted").get(function () {
  const createdAt = this.createdAt;

  // Format the createdAt timestamp using toLocaleString
  const formattedCreatedAt = createdAt.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  return formattedCreatedAt;
});

module.exports = mongoose.model("Message", MessageSchema);
