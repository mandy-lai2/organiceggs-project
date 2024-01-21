const n={methods:{timeDate(t){return new Date(t*1e3).toLocaleDateString("en-CA")},dateToTime(t=null){return t?new Date(t).getTime()/1e3:new Date().getTime()/1e3}}};export{n as d};
