// automatically import all files ending in *.state.ts
// @ts-ignore
const stateReq = require['context']('.', true, /.state.ts$/);
stateReq.keys().forEach(stateReq);

// automatically import all files ending in *.reducer.ts
// @ts-ignore
// const reducerReq = require['context']('.', true, /.reducer.ts$/);
// reducerReq.keys().forEach(reducerReq);
