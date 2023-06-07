import UTXOPool from './UTXOPool.js'
import { values } from 'ramda'
import UTXO from './UTXO.js'
import sha256 from 'crypto-js/sha256.js'
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
      constructor(name) {
        this.name=name
        this.genesis=''
        this.blocks=new Array()
      }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let chain = new Array()
    let longestBlock = this.genesis
    for(let tempBlock of Object.values(this.blocks)){
      if(longestBlock.height<tempBlock.height){
        longestBlock=tempBlock
      }
    }

    let hash=longestBlock.hash
    while(hash!=this.genesis.hash){
      chain.unshift(this.blocks[hash])
      hash=this.blocks[hash].prevHash
    }

    //this.blocks = chain

    return chain
  }

  // 判断当前区块链是否包含
  containsBlock(Block) {
    // 添加判断方法
    if (Block.height==1&&Block.hash==this.genesis.hash) {
      return true
    }
    for (let tempblock of Object.values(this.blocks)) {
      if (Block.hash==tempblock.hash) {
        return true
      }else{
        continue
      }
    }
    return false
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    // return Block
    let maxHeight = this.blocks.length
    for(let tempBlock of Object.values(this.blocks)){
      if(tempBlock.height==maxHeight){
        return Block
      }
    }
  }
  _addBlock(block) {
    if (this.containsBlock(block)) return

    // 添加 UTXO 快照与更新的相关逻辑

        // 添加 UTXO 快照与更新的相关逻辑
        if (!block.isValid()) return
        if (this.containsBlock(block)) return

        // 获取待添加区块的上一个区块
        const prevBlock = this.getPrevBlock(block);
        if (!prevBlock) return;

        // // 构造父节点的utxoPool快照
        // const snapshot = prevBlock.utxoPool.snapshot()
        let snapshot = prevBlock.utxoPool.clone()

        //继承父区块的utxopool
        block.utxoPool.inherit(snapshot)

        //把coinBase交易加入utxopool
        block.coinBase()

        // //将UTXO池的状态回滚到上一个区块对应的UTXO池状态
        // block.utxoPool.rollback(prevBlock.utxoPool.getUtxoPoolSnapshot())

        // // 将新的UTXO池状态更新到最新的状态
        // block.utxoPool.commit(snapshot)

        // 将区块添加到区块链中
        this.blocks[block.hash] = block;
  }

  getPrevBlock(block) {

    if (block.height==1) {
      return this.genesis
    }

    for (let tempBlock of Object.values(this.blocks)) {
      if (tempBlock.hash === block.prevHash) {
        return tempBlock;
      }
    }
    return null;
  }
}

export default Blockchain
