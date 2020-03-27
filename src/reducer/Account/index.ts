import Account from './Account';

// automatically import all files ending in *.action.ts
// @ts-ignore
const req = require['context']('./', true, /.action.ts$/);
req.keys().forEach(req);

export default Account;
