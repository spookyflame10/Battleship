
const Ship = (length = null)=>{
    let hits =0;
    const getHits = () => hits;
    function hit(){
        if(hits>=length){
            return;
        }
        hits++;
    }
    const isSunk = () => hits >= length;
    return {length,getHits, hit, isSunk};
}
export default Ship;