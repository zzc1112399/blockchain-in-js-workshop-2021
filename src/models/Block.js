import sha256 from 'crypto-js/sha256.js'
/*
所属链chain
父区块的hash
所属位置index
时间戳time
*/
class Block {
    constructor(chain,previousHash,index,time) {
      this.Chain = this.Chain
      this.previousHash = previousHash
      this.index=index
      this.time=time
      this.hash = this.calculateHash()
    }
    //hash计算
    calculateHash() {
      return sha256(
        this.Chain+
          this.previousHash +
          this.index+
          this.time
      ).toString()
    }
  } 

export default Block
