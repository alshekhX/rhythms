export default{

    formatTime(time){

        const mins= Math.floor(time/60) ||0;
        const secounds= Math.floor(time-mins*60) ||0

        return `${mins}:${secounds<10? '0':''}${secounds}`
    }
}