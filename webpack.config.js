const { register } = require('module');
const path = require('path');
 
module.exports = {
  mode: 'development',
  devtool:'source-map',
  entry: {
    login : './credential-form/login.ts',
    register: './credential-form/register.ts',
    addevent : './user-modules/addevent.ts',
    myevents : './user-modules/myevent.ts',
    update: './user-modules/update.ts',
    agenda: './user-modules/agenda.ts',
    manageguest: './user-modules/guestManage.ts',
    addGuest: './user-modules/addGuest.ts',
    updateGuest: './user-modules/updateGuest.ts',
    userManage: './admin-modules/userManage.ts',
    addCategory: './admin-modules/addCategory.ts',
    addUser: './admin-modules/addUser.ts',
    updateUser: './admin-modules/updateUser.ts'
  },
  output: {
    filename: '[name].bundle.js', // Dynamic output filenames based on entry point names
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve both .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply ts-loader to TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web', // Ensure the bundles are for the web
};
 