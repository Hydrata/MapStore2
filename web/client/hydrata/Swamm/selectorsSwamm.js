export const orgSelector = (state) => state?.swamm?.bmpTypes ?
    state?.swamm?.bmpTypes.map(item => item?.organisation).filter((v, i, a)=>a.findIndex(t=>(t.id === v.id)) === i) :
    null;
