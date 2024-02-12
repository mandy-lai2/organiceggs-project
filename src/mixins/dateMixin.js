export default {
  methods: {
    // 轉換時間 數字轉字串 2024-1-15
    timeDate(time){
      const localDate = new Date(time * 1000); //換成毫秒
      return localDate.toLocaleDateString('en-CA'); 
    },
    dateToTime(dateString=null) {
      if(dateString){
        const dateObject = new Date(dateString);
        const timestamp = dateObject.getTime() / 1000; // 轉換為秒
        return timestamp;

      }else {
        const dateObject = new Date();
        const timestamp = dateObject.getTime() / 1000; // 轉換為秒
        return timestamp;
      }
    }
  },
 
};
