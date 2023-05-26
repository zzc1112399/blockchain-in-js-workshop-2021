import UTXOPool from './UTXOPool.js'

class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
 constructor(name){
  this.name=name
  this.genesis = null
  this.blocks = {}
  this.utxoPool=new UTXOPool()
  
 }

 longestChain(){
  var longestChain = []
    var temp = 0 //用于记录区块高度
    var BlockPointer = null 
    // 遍历所有区块，找到最高的区块高度
    for (let hash in this.blocks) {
      // 我们的集合结构是：    hash:区块
      if (this.blocks[hash].height >= temp) {
          temp = this.blocks[hash].height
      }
    }
    // 根据区块高度找到最高的区块
    for (let hash in this.blocks) {
      if (this.blocks[hash].height === temp) {
        BlockPointer = this.blocks[hash]
        longestChain.push(BlockPointer)
        break
      }
    }
    // 根据该区块一直向前遍历，直至创世区块
    while (this.blocks[BlockPointer.previousHash] != null) { 
      //因为高度为1的区块的previousHash是'root'，它在this.blocks里面找不到相同的值，因此会是null
      // 因为之前已经将最高的区块放进了longestChain数组
      // 这里每次遍历，是将BlockPointer前一个区块放进longestChain数组
      longestChain.push(this.blocks[BlockPointer.previousHash])
      BlockPointer = this.blocks[BlockPointer.previousHash]
    }
    return longestChain.reverse()
 }



  // 判断当前区块链是否包含
  containsBlock(block) {
    if (block.height==1&&block.hash==this.genesis.hash) {
      return true
    }
    for (let tempblock of Object.values(this.blocks)) {
      if (block.hash==tempblock.hash) {
        return true
      }
    }
    return false
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    let keysCount = Object.keys(this.blocks).length
    if(keysCount == 0){
      return 0
    }
    let height = Object.keys(this.longestChain()).length
    return this.longestChain()[height-1]
  }

  // 添加区块
  /*

  */
  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    this.blocks[block.hash] = block
    block.utxoPool=this.utxoPool
    // 添加 UTXO 快照与更新的相关逻辑
    //快照
    this.preUtxoPool=this.utxoPool.clone()
    //更新
    console.log(block.coinbaseBeneficiary);
    this.utxoPool.addUTXO(block.coinbaseBeneficiary)

  }
}

export default Blockchain
