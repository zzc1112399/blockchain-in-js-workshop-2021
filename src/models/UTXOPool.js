import UTXO from './UTXO.js'
import Transaction from '../models/Transaction.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos=utxos
  }

  addUTXO(utxo) {
    this.utxos[utxo.txid]=utxo
  }

  clone() {
    let temp;
    temp={...this}
    return temp
  }

  inherit(snapshot) {
    for (let utxo of Object.values(snapshot)) {
      this.utxos[utxo.txId] = utxo;
    }
  }

  getUtxoPoolSnapshot() {
    return Object.assign({}, this.utxos);
  }

  createUtxo(outputPublicKey,inputPublicKey){
    let accountState = false
    for(let tempUtxo of Object.values(this.utxos)){
      if (tempUtxo.txId == outputPublicKey) {
        accountState = true
        break
      }
    }
    if (accountState==false) {
      let accountUtxo = new UTXO(outputPublicKey,outputPublicKey,inputPublicKey,null)
      this.addUTXO(accountUtxo)
    }
  }

  // 处理交易函数
  handleTransaction(tx) {
    if (!this.isValidTransaction(tx.inputPublicKey,tx.amount)) {
      return
    }
    this.createUtxo(tx.outputPublicKey,tx.inputPublicKey)
    this.utxos[tx.inputPublicKey].amount -= tx.amount
    this.utxos[tx.outputPublicKey].amount += tx.amount
  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction() {
    if(this.utxos[inputPublicKey].amount >= amount){
      return true
    }else{
      return false
    }

  }
}

export default UTXOPool
