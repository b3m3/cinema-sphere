export const extraReducersBody = (builder, asyncThunk) => {
  const { pending, fulfilled, rejected } = asyncThunk;

  return builder
    .addCase(pending, (state) => {
      state.loading = true;
      state.res = null;
      state.status = null;
    })
    .addCase(fulfilled, (state, {payload}) => {
      state.loading = false;
      state.res = payload;
    })
    .addCase(rejected, (state, {payload}) => {
      state.loading = false;
      state.status = payload.message;
    })
}

export const extraReducersTrendingBody = (builder, stateName, asyncThunk) => {
  const { pending, fulfilled, rejected } = asyncThunk;

  return builder
    .addCase(pending, (state) => {
      state[`${stateName}`].loading = true;
      state[`${stateName}`].res = null;
      state[`${stateName}`].status = null;
    })
    .addCase(fulfilled, (state, {payload}) => {
      state[`${stateName}`].loading = false;
      state[`${stateName}`].res = payload;
    })
    .addCase(rejected, (state, {payload}) => {
      state[`${stateName}`].loading = false;
      state[`${stateName}`].status = payload.message;
    })
}