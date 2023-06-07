export default class UTXO {
  constructor(txid,address,prevTxHash,height) {
    this.txid=txid
    this.prevTxHash=prevTxHash
    this.address=address
    this.value=12.5
    this.spent=false
    this.height=height
    this.amout=0
    this.setValue()
  }

  setValue(){
    if(this.spent&&this.spent==true){
         return true;
     } else {
       // 否则表示该 UTXO 未被花费
       return false;
    }
  }
  
}
