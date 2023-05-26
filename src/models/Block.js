import sha256 from 'crypto-js/sha256.js'


export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(MyChain,previousHash,height,hash,coinbaseBenefciary) {
    this.MyChain=MyChain
    this.previousHash=previousHash
    this.height=height
    this.nonce=""
    this.hash=hash
    this.coinbaseBenefciary=coinbaseBenefciary
    this.UTXOPool= null
    }

  isValid() {
    let cnt=0;
    for(let i of this.nonce){
      if(i!="0")break;
      cnt++;
    }
    return cnt>=DIFFICULTY
  
  }

  setNonce(nonce) {
    this.nonce=nonce
  }

  
  
}

export default Block
