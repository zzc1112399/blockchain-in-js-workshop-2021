import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos=utxos
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(owner) {
    if(owner in this.utxos){
      this.utxos[owner].amount+=12.5
    }
    else{
      this.utxos[owner]=new UTXO(
        owner,
        12.5
      )
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    let temp;
    temp={...this}
    return temp
  }
}

export default UTXOPool
