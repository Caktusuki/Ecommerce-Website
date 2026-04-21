import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/models/user';

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');
    const result = await User.updateMany({}, { role: 'admin' });
    console.log(`Successfully upgraded ${result.nModified || result.modifiedCount || result.n || 0} users to admin!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
