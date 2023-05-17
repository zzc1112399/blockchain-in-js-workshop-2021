// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name=name
    this.genesis=null
    this.blocks={}
  }

  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let longestChain = []
    let currentChain = []

    // 从每个块开始，递归查找最长的区块链
    for (const hash in this.blocks) {
       var block = this.blocks[hash]
      currentChain = []

      // 从当前块向前查找区块链
      while (block) {
        currentChain.unshift(block)
        block = this.blocks[block.previousHash]
      }

      // 如果找到了更长的区块链，则更新longestChain
      if (currentChain.length > longestChain.length) {
        longestChain = currentChain
      }
    }

    return longestChain
  }
}

export default Blockchain
/*
constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}
  }

    longestChain() {
      let longestChain = []
      let currentChain = []
  
      // 从每个块开始，递归查找最长的区块链
      for (const hash in this.blocks) {
         var block = this.blocks[hash]
        currentChain = []
  
        // 从当前块向前查找区块链
        while (block) {
          currentChain.unshift(block)
          block = this.blocks[block.previousHash]
        }
  
        // 如果找到了更长的区块链，则更新longestChain
        if (currentChain.length > longestChain.length) {
          longestChain = currentChain
        }
      }
  
      return longestChain
    }
*/