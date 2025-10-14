export const databaseConfig = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/desafio-inmeta',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
