class MerkleTree {
    constructor(data) {
      this.leaves = [];
      this.levels = [[]];
  
      if (data) {
        this.addLeaves(data);
      }
    }
  
    addLeaf(leaf) {
      this.leaves.push(leaf);
      this.levels[0].push({
        hash: hash(leaf),
        value: leaf,
      });
      this.rebuildTree();
    }
  
    addLeaves(data) {
      data.sort();
      for (let i = 0; i < data.length; i++) {
        this.addLeaf(data[i]);
      }
    }
  
    removeLeaf(leaf) {
      const index = this.leaves.indexOf(leaf);
      if (index !== -1) {
        this.leaves.splice(index, 1);
        this.levels[0].splice(index, 1);
        this.rebuildTree();
      }
    }
  
    rebuildTree() {
      let levelIndex = 0;
      let level = this.levels[levelIndex];
      while (level.length > 1) {
        this.levels.push([]);
        levelIndex++;
        level = this.levels[levelIndex];
        for (let i = 0; i < level.length; i += 2) {
          const left = level[i];
          const right = level[i + 1] || left;
          const combinedHash = hash(left.hash.toString() + right.hash.toString());
          level.push({
            hash: combinedHash,
            left,
            right,
          });
        }
      }
    }
  
    getRootHash() {
      return this.levels[this.levels.length - 1][0].hash;
    }
  
    getProof(leaf) {
      const index = this.leaves.indexOf(leaf);
      if (index === -1) {
        return null;
      }
  
      const proof = [];
      for (let levelIndex = 0; levelIndex < this.levels.length - 1; levelIndex++) {
        const level = this.levels[levelIndex];
        const isRightNode = index % 2 === 1;
        const siblingIndex = isRightNode ? index - 1 : index + 1;
        if (siblingIndex < level.length) {
          const sibling = level[siblingIndex];
          proof.push({
            direction: isRightNode ? "left" : "right",
            hash: sibling.hash,
          });
        }
        index = Math.floor(index / 2);
      }
      return proof;
    }
  }
  
  function hash(str) {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  
  function verify(leaf, proof, rootHash) {
    let computedHash = hash(leaf);
    for (let i = 0; i < proof.length; i++) {
      const proofElement = proof[i];
      const isLeftNode = proofElement.direction === "left";
      const siblingHash = proofElement.hash;
      const parentHash = isLeftNode
        ? hash(siblingHash.toString() + computedHash.toString())
        : hash(computedHash.toString() + siblingHash.toString());
      computedHash = parentHash;
    }
    return computedHash === rootHash;
  }
  
  // Example usage:
  const data = ["apple", "banana", "cherry", "durian", "elderberry", "fig"];
  const tree = new MerkleTree(data);
  console.log("Leaves:", tree.leaves);
  console.log("Root hash:", tree.getRootHash());
  
  const leafToVerify = "banana";
  const proof = tree.getProof(leafToVerify);
  console.log("Proof for", leafToVerify, ":", proof);
  console.log("Verification result:", verify(leafToVerify, proof, tree.getRootHash()));
  