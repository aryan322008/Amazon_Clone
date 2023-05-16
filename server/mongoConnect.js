import { connect } from "mongoose";

const main = async () => {
  await connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@aryale32.1xar56b.mongodb.net/shopDB?retryWrites=true&w=majority`
  );
};

export default main;
